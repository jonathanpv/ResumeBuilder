// @ts-nocheck
'use client'


import { useState, useEffect } from 'react';

const usePDFEngine = () => {
    const [engine, setEngine] = useState(null);
    const [isEngineReady, setIsEngineReady] = useState(false);

    useEffect(() => {
        const initEngine = async () => {
            const script = document.createElement('script');
            script.src = '/PdfTeXEngine.js';
            script.onload = async () => {
                const pdfTeXEngine = new window.PdfTeXEngine();
                await pdfTeXEngine.loadEngine();
                setEngine(pdfTeXEngine);
                setIsEngineReady(true);
            };
            document.body.appendChild(script);
            return () => document.body.removeChild(script);
        };
        initEngine();
    }, []);

    return { engine, isEngineReady };
};

export default usePDFEngine;
