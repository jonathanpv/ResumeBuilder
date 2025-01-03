// @ts-nocheck
'use client'

import { useState, useRef, Suspense } from 'react';
import { Button } from "@/components/ui/button"

import usePDFEngine from '@/hooks/usePDFEngine';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';
import { ResumeBuilder } from '@/components/resume-builder'

import { Code, FileText } from 'lucide-react';
import CodeEditor from '@/components/ui/editor';
import { jsonToLatexString } from "@/lib/json2latex";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useSearchParams, useRouter } from 'next/navigation'
import { CommandDialogDemo } from '@/components/command-dialog';
import { emptyResume, tempResume } from '@/lib/utils';

// Separate component for search params functionality
function SearchParamsComponent() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    console.log(search);
    return null;
}

const PdfTeXPage = () => {
    // Initialize the router
    const router = useRouter();

    const { engine, isEngineReady } = usePDFEngine();

    const [pdfUrl, setPdfUrl] = useState('');
    const [isRendering, setIsRendering] = useState(false); // New state for rendering status

    const [resume, setResume] = useState({
        ...emptyResume,
        sectionOrder: [
            'personalInfo',
            'skills',
            'jobExperience',
            'projectExperience',
            'education'
        ],
    });

    const [compileFailed, setCompileFailed] = useState(false);
    const [resumeFeedback, setResumeFeedback] = useState({
        "personalInfo.name": "Your name looks great!",
        "jobExperience.0.title": "Consider specifying your job title more clearly.",
    });

    const printResume = () => {
        console.log(JSON.stringify(resume, null, 2));
    };

    // Compiles the resume fields into a LaTeX resume then renders it as a PDF
    const handleCompile = async () => {
        if (!isEngineReady || !engine) {
            console.log('Engine or editor not ready yet');
            return;
        }

        setIsRendering(true);
        setCompileFailed(false);

        const latexResume = jsonToLatexString(resume, resume.sectionOrder || []);
        console.log("resume:\n\n", resume);
        console.log("latexResume:\n\n", latexResume);
        engine.writeMemFSFile('main.tex', latexResume);

        engine.setEngineMainFile('main.tex');
        const result = await engine.compileLaTeX();
        console.log(result.log);

        if (result.status === 0) {
            const pdfBlob = new Blob([result.pdf], { type: 'application/pdf' });
            const objectURL = URL.createObjectURL(pdfBlob);
            setPdfUrl(objectURL);

            setTimeout(() => {
                URL.revokeObjectURL(objectURL);
            }, 30000);
            // End rendering 
        } else {
            setCompileFailed(true);
        }
        setIsRendering(false);
    };

    // Helper function to encode Unicode strings to base64
    const b64EncodeUnicode = (str) => {
        return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
                (match, p1) => String.fromCharCode('0x' + p1)
            )
        );
    };

    // Handles the "View code" button click
    const handleViewCode = () => {
        const latexCode = jsonToLatexString(resume, resume.sectionOrder || []);
        const base64Code = b64EncodeUnicode(latexCode);
        const encodedCode = encodeURIComponent(base64Code);
        router.push(`/latexeditor?code=${encodedCode}`);
    };

    return (
        <div className="flex flex-col h-screen px-7">
            <Suspense>
                <SearchParamsComponent />
            </Suspense>
            {/* only visible in small screens */}
            <div className="w-full h-full md:hidden">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">ResumeCreator</h2>
                <p className="text-sm text-muted-foreground">ResumeCreator only works on desktop, due to the WASM LaTex engine. Sorry!</p>
            </div>
            <div className="hidden md:w-full md:flex md:flex-row md:justify-between md:space-y-2 md:py-4 md:items-center">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">
                    ResumeCreator
                </h2>

                <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                    <Button onClick={handleCompile} disabled={!isEngineReady || isRendering} variant={"secondary"}>
                        {isRendering ? 'Rendering' : (isEngineReady ? 'Compile' : 'Initializing')}
                    </Button>
                    <Button onClick={handleViewCode} variant={"secondary"}>
                        View code
                    </Button>

                    <Button onClick={() => console.log("bruh")} variant={"secondary"}>
                        Share
                    </Button>

                    <Button variant={"secondary"}>
                        <CommandDialogDemo setResume={setResume} printResume={printResume} />
                    </Button>
                </div>
            </div>
            <Separator className="hidden md:contents"/>

            <ResizablePanelGroup direction="horizontal" className="hidden md:flex">
                <ResizablePanel className="hidden md:flex md:flex-col md:pr-4 md:pb-4" defaultSize={400}>
                    <ResumeBuilder 
                        resume={resume} 
                        setResume={setResume} 
                        resumeFeedback={resumeFeedback} 
                    />
                </ResizablePanel>

                <ResizableHandle withHandle className="hidden md:flex" />

                <ResizablePanel className="hidden md:flex md:flex-col" defaultSize={400}>
                    {isRendering ? (
                        <div className='bg-background h-full p-4'>
                            <div className="space-y-3 h-full">
                                <Skeleton className="h-full w-full rounded mb-4 flex justify-center items-center">
                                    <FileText className="text-slate-600" />
                                </Skeleton>
                            </div>
                        </div>
                    ) : compileFailed ? (
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Compiling your resume to LaTeX has failed, see console for LaTeX error.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="pdf-section flex-grow px-4 py-1">
                            {pdfUrl && (
                                <embed
                                    className="rounded-lg"
                                    src={pdfUrl}
                                    width="100%"
                                    height="100%"
                                    type="application/pdf"
                                />
                            )}
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default PdfTeXPage;