"use client";

import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { PlusIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { Button } from "../ui/button";

const QuillEditor = dynamic(
  ()=>import('react-quill'),
  {
    ssr: false,
  }
);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export type PostContent = {
    content: string,
}

export default function Home() {
  const [ content, setContent ] = useState('');
  
  const handleClick = async(content: string) =>{
    try{
        const data = {
            content: content
        } as PostContent;

        await axios.post('/api/sendpost', data)
        .then(res=>{
            console.log(res)
        })
    }catch(err){
        console.log(err)
    }
    
  }

  return (
    <div>
        <QuillEditor theme="snow" modules={modules} formats={formats} value={content} onChange={setContent}/>
        <Button onClick={(event)=>handleClick(content)} className="mt-5">
            
            Send
        </Button>
        <p>{content}</p>
    </div>
    
  )
}
