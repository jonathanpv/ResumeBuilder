import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import '@/app/latexeditor/prism-latex';
import './editor.css'
// import '@/app/prism-synthwave.css';

function CodeEditor({ className = "", textareaClassName = "", code, setCode}) {
  
  return (
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.latex)
        .split('\n')
        .map((line, index) =>
        `<span class="container_editor_line_number">${line}</span>`
        )
        .join('\n')}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      className={`${className} container__editor`}
      textareaClassName={`${textareaClassName}`}
    />
  );
}

export default CodeEditor;
