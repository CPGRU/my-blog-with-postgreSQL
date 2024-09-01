"use client";

import "react-quill/dist/quill.snow.css";
import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
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
    title: string,
    post_content: string,
}

export default function Form() {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
  
    const handleSubmit = async(event:FormEvent) =>{
        event.preventDefault();

        if( title && content){
            const data = {      
                title,
                post_content: content,
            } as PostContent;

            await axios.post('/api/sendpost', data)
                .then(res=>{console.log(res)})
                .catch(err=>console.log(err))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="your title"required/>
                <QuillEditor theme="snow" modules={modules} formats={formats} value={content} onChange={setContent} placeholder="your content"/>
                <Button  className="mt-5">
                    <PlusCircleIcon className="w-5"/>
                    <span className="ml-2" >Send</span>
                </Button>
            </form>
            
            <p>{content}</p>
        </div> 
    )
}