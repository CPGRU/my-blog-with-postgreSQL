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


export default function Form() {
    
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ selectedImage, setSelectedImage ] = useState<File | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const date = selectedDate?.toISOString().split('T')[0];

    //const [ postImage, setPostImage ] = useState('')
    const [ imageName, setImageName ] = useState('')
    
    console.log(imageName)
    
    const handleSubmit = async(event:FormEvent) =>{
        event.preventDefault();

        if( title && content ){
            const data = {
                post_date: date,
                title,
                post_content: content,
                post_image: imageName,
            } as PostData;

            await axios.post('/api/sendpost', data)
                .then(res=>{console.log(res)})
                .catch(err=>console.log(err))
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        if(event.target.files != null){
            let img = event.target.files[0];
            setSelectedImage(img);
            console.log(selectedImage)
        }
    }

    

    return (
        <div>
            
            <br/>
            <div>
                <h3>Upload and display Image</h3>
                { selectedImage && (
                    <img src={URL.createObjectURL(selectedImage)} alt="post image"/>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange}/>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <UploadImage onImageClick={(filename)=>setImageName(filename)}/>

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
                <div className="mt-10">
                    <label htmlFor="title">Title</label>
                    <input id="title" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="your title"required/>
                </div>
                
                <QuillEditor theme="snow" modules={modules} formats={formats} value={content} onChange={setContent} placeholder="your content"/>
                
                
                
                <Button  className="mt-5">
                    <PlusCircleIcon className="w-5"/>
                    <span className="ml-2" >Send</span>
                </Button>                
            </form>            
        </div> 
    )
}
