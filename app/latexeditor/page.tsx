// @ts-nocheck
'use client'
// pages/pdftex.tsx
import { useState } from 'react';
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button"

import usePDFEngine from '@/hooks/usePDFEngine';
// import useAceEditor from '@/hooks/useAceEditor';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';

import { Code, FileText } from 'lucide-react';
import CodeEditor from '@/components/ui/editor';


const PdfTeXPage = () => {
    // const { editor, getContent } = useAceEditor(editorRef, initialContent);

    const { engine, isEngineReady } = usePDFEngine();
    // const editor = useAceEditor(editorRef, initialContent);

    const [pdfUrl, setPdfUrl] = useState('');
    const [isRendering, setIsRendering] = useState(false); // New state for rendering status
    const [code, setCode] = useState(`\\documentclass{article}
    \\usepackage{tgtermes}
    \\renewcommand*\\ttdefault{txtt}
    \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\input glyphtounicode
    \\begin{document}
    \\pdfgentounicode=1
    \\noindent
    \\rmfamily
    rmfamily: zażółć gęsią jaźń \\
    \\ttfamily
    ttfamily: zażółć gęsią jaźń \\
    \\end{document}`);

    
    const onChange = (newValue) => {
        setEditorContent(newValue);
        console.log(editorContent);

    }
    const handleCompile = async () => {
        if (!isEngineReady || !engine) {
            console.log('Engine or editor not ready yet');
            return;
        }

        setIsRendering(true); // Start rendering

        // this is one
        // let content = getContent();
        // engine.writeMemFSFile('main.tex', content);

        // this is the other one
        engine.writeMemFSFile('main.tex', code);

        engine.setEngineMainFile('main.tex');
        const result = await engine.compileLaTeX();
        console.log(result.log);

        if (result.status === 0) {
            const pdfBlob = new Blob([result.pdf], { type: 'application/pdf' });
            const objectURL = URL.createObjectURL(pdfBlob);
            setPdfUrl(objectURL );

            setTimeout(() => {
                URL.revokeObjectURL(objectURL);
            }, 30000);
            setIsRendering(false); // End rendering

        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                    Editor
                </h2>

                <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                    <Button onClick={handleCompile} disabled={!isEngineReady || isRendering} variant={"secondary"}>
                        {isRendering ? 'Rendering' : (isEngineReady ? 'Compile' : 'Initializing')}
                    </Button>
                    <Button onClick={console.log("bruh")} variant={"secondary"}>
                        View code
                    </Button>

                    <Button onClick={console.log("bruh")} variant={"secondary"}>
                        Share
                    </Button>
                </div>
            </div>
            <Separator></Separator>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="flex flex-col pl-12" defaultSize={400}>
                    <CodeEditor 
                    code={code}
                    setCode={setCode}
                    className="flex-grow bg-background rounded-lg"
                    textareaClassName="focus:outline-none"
                    />
                </ResizablePanel>

                <ResizableHandle withHandle />
                
                <ResizablePanel className="flex flex-col " defaultSize={400}>
                    {isRendering ? (
                        <div className='bg-background h-full p-4'>
                            {/* Larger Skeleton for document title */}

                            {/* Larger Skeletons for document text lines */}
                            <div className="space-y-3 h-full">
                                <Skeleton className=" h-full w-full rounded mb-4 flex justify-center items-center">
                                    <FileText className="  text-slate-600"></FileText>

                                </Skeleton>
                                
                            </div>
                        </div>
                    ) : (
                        <div className="pdf-section flex-grow px-4 py-1">
                            {pdfUrl && <embed className=" rounded-lg" src={pdfUrl} width="100%" height="100%" type="application/pdf" />}
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    );
};

export default PdfTeXPage;
