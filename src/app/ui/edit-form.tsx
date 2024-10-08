"use client";

import "react-quill/dist/quill.snow.css";
import 'react-datepicker/dist/react-datepicker.min.css';
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { DocumentCheckIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import DatePicker from "react-datepicker";
import { PostData } from "../lib/definitions";
import { QuillEditor, modules, formats } from "./text-editor";
import { Button } from "./button";
import UploadImage from "./upload-image";
import Dropdown from "./dropdown";


interface PostProps{
    post: PostData
};

export default function EditForm({post}: PostProps) {
     const options = [
        {label: 'Travel', value: 'travel'},
        {label: 'Food', value: 'food'},
        {label: 'Tech', value: 'tech'},
        {label: 'Health', value: 'health'},
    ]; 

    const router = useRouter();

    const option = options.filter((option)=> option.value == post.post_theme) ;
    const theme = option[0];
    
    const [ selectedTheme, setSelectedTheme ] = useState<{label: string, value: string} | null>(theme);
    const [ title, setTitle ] = useState(post.title);
    const [ content, setContent ] = useState(post.post_content);
    const [ imageName, setImageName ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(new Date(post.post_date));
    const date = selectedDate?.toISOString();
    
    const handleSubmit = async(event:FormEvent) =>{
        event.preventDefault();
       
        if( title && content ){
            const data = {
                post_date: date,
                title,
                post_content: content,
                post_image: post.post_image,
                post_theme: post.post_theme
            } as PostData;

            await axios.put(`/api/blogpost/${post.id}/`, data)
                .then(res=>{
                    console.log(res); 
                    router.push('/management');
                    router.refresh();
                })
                .catch(err=>console.log(err))        
        };
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}  className="flex flex-col">
                <div >
                    <div className="flex flex-row mb-[60px]">
                        <Dropdown options={options} value={selectedTheme} onChange={(option)=> setSelectedTheme(option)}/>
                        <input className="border ml-5 w-full" id="title" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="title..."required/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mt-5">
                        <label htmlFor="date">publish date</label>
                        <DatePicker 
                            id="date" 
                            selected={selectedDate} 
                            onChange={(date)=>setSelectedDate(date)} 
                            showIcon
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fill="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                    </div>
                    <QuillEditor className="bg-gray-300" theme="snow" modules={modules} formats={formats} value={content} onChange={setContent} placeholder="your content" />
                    <UploadImage onImageClick={(filename)=>setImageName(filename)} />        
                </div>
                <Button  className="mt-30">
                    <DocumentCheckIcon className="w-5"/>
                    <span className="ml-2" >Save</span>
                </Button>                   
            </form>            
        </div> 
    )
}