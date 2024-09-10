"use client";

import "react-quill/dist/quill.snow.css";
import 'react-datepicker/dist/react-datepicker.min.css';
import { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import DatePicker from "react-datepicker";
import { PostData } from "../lib/definitions";
import { QuillEditor, modules, formats } from "./text-editor";
import { Button } from "./button";
import UploadImage from "./upload-image";
import Dropdown from "./dropdown";



export default function Form() {
    const [ selectedTheme, setSelectedTheme ] = useState<{label: string, value: string} | null>(null);
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ imageName, setImageName ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(new Date());
    const date = selectedDate?.toISOString().split('T')[0];
    
    const options = [
        {label: 'Travel', value: 'travel'},
        {label: 'Food', value: 'food'},
        {label: 'Tech', value: 'tech'},
        {label: 'Health', value: 'health'},
    ]; 
    
    const handleSubmit = async(event:FormEvent) =>{
        event.preventDefault();
        if( title && content && imageName && selectedTheme ){
            const data = {
                post_date: date,
                title,
                post_content: content,
                post_image: imageName,
                post_theme: selectedTheme?.value
            } as PostData;

            await axios.post('/api/sendpost', data)
                .then(res=>{console.log(res)})
                .catch(err=>console.log(err))
            
            setSelectedTheme(null);
            setSelectedDate(new Date());
            setTitle('');
            setContent('');
            setImageName('')
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}  className="flex flex-col">
                <div >
                    <div className="flex flex-row mb-[60px]">
                        <Dropdown options={options} value={selectedTheme} onChange={(option)=> setSelectedTheme(option)}/>
                        <input className="border ml-5" id="title" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="title..."required/>
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
                    <PlusCircleIcon className="w-5"/>
                    <span className="ml-2" >Send</span>
                </Button>                   
            </form>            
        </div> 
    )
}
