import React, { useState, useRef } from 'react';
import Image from 'next/image'
import { Upload, Button } from 'antd';
// import ReactQuill from 'react-quill'; // react
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const UploadAndDisplay: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [content, setContent] = useState('');
  // const quillRef = useRef<any>(null); // react

  const handleUploadChange = (info: any) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // 只保留最新上传的文件
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url; // 将服务器返回的URL保存到file对象中
        insertFileLink(file.url); // 在富文本中插入链接
      }
      return file;
    });
    setFileList(newFileList);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const insertFileLink = (url: string) => { 
    // const quill = quillRef.current.getEditor();
    const quill = (ReactQuill as any).Quill; // react
    const range = quill?.getSelection();
    quill?.insertText(range ? range.index : 0, `\n\n${url}\n\n`); // react
    // if(range) {
    //   quill.insertEmbed(range.index,  'extendedImage', {
    //     src: url
    //   });
    // }
  }

  return (
    <div>
      <Upload
        action="http://127.0.0.1:7001/"
        fileList={fileList}
        onChange={handleUploadChange}
        multiple={false}
        showUploadList={false}
      >
        <Button>上传文件</Button>
      </Upload>
      <ReactQuill value={content} onChange={handleContentChange} />
      {/* react */}
      {/* <ReactQuill ref={quillRef} value={content} onChange={handleContentChange} /> */}
      {fileList.map((file) => (
        <div key={file.uid}>
          {file.type.includes('image') ? (
            <Image src={file.url} alt={file.name} style={{ maxWidth: '100%' }} />
          ) : (
            <video src={file.url} controls style={{ maxWidth: '100%' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default UploadAndDisplay;