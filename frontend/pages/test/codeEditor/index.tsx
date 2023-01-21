import React from 'react';
import Layout from '../../../components/layouts/layout';
import CodeEditor from './editor';

export default function Index() {

  const onSubmit = () => {
    const code = (document.getElementById('codeArea') as HTMLInputElement).value;
    console.log(code);
  }

  return (
    <Layout>
      <CodeEditor />
      <button onClick={onSubmit}>送出</button>
    </Layout>
  );
}