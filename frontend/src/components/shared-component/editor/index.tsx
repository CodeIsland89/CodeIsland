import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import styled from 'styled-components';

const hightlightWithLineNumbers = (input, language) => highlight(input, language, '')
  .split('\n')
  .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
  .join('\n');

type CodeEditorProps = { className?: string, defaultCode?: string };

function CodeEditor({ className = '', defaultCode = '' }: CodeEditorProps) {
  const [code, setCode] = React.useState(
    defaultCode,
  );

  return (
    <div className={className}>
      <Editor
        value={code}
        onValueChange={(value) => setCode(value)}
        highlight={(value) => hightlightWithLineNumbers(value, languages.js)}
        padding={10}
        textareaId="codeArea"
        className="editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
        }}
      />
    </div>
  );
}

const StyledElement = styled(CodeEditor)`
  overflow: hidden;
  
  .editor {
    counter-reset: line;
    min-height: 3rem;
  }
  .editor #codeArea {
    outline: none;
    padding-left: 60px !important;
  }
  .editor pre {
    padding-left: 60px !important;
  }
  .editor .editorLineNumber {
    position: absolute;
    left: 0px;
    color: #cccccc;
    text-align: right;
    width: 40px;
    font-weight: 100;
  }
`;

export default StyledElement;
