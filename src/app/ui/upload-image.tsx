import { useState } from "react";
import axios from "axios";
import { Button } from "./button";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";


interface ImageNameProps {
    onImageClick: (filename: string)=>void
}

export default function UploadImage ({ onImageClick }: ImageNameProps){
    const [ image, setImage ] = useState({
        preview: '',
        raw: '',
        name: ''
    });
    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append('file', image.raw);
        const result = await axios.post(`/api/upload`, formData , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response =>{
            onImageClick(response.data.file);
            return response.data
        })
        .catch(error=> console.log(error)) 
    };
    const handlePhotoChange = (e: any) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
                name: e.target.files[0].name
            });
        }
    };
    return (
        <div className="bg-gray-200">
            <label htmlFor="upload-button">
                {image.preview && (
                    <>
                        <img
                            src={image.preview}
                            width="300"
                            height="300"
                            className="my-10 mx-5 "
                        />
                        <Button onClick={handleSubmit}>
                            <ArrowDownTrayIcon className="w-5"/>
                            <span className="ml-2">Save</span>
                        </Button>
                    </>
                ) }
            </label>
            <input
                name="image"
                type="file"
                id="upload-button"
                accept="image/*"
                onChange={handlePhotoChange}
            />
            
        </div>
    )

}