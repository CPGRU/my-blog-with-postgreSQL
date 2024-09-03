import { useState } from "react";
import axios from "axios";
import { Button } from "./button";
import Image from "next/image";


interface ImageNameProps {
    onImageClick: (filename: string)=>void
}

export default function UploadImage ({ onImageClick }: ImageNameProps){
    const [ image, setImage ] = useState({
        preview: '',
        raw: '',
        name: ''
    });

    

    const submit = async () => {
        

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
        
    }


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
        <div>
            <label htmlFor="upload-button">
                {image.preview && (
                    <img
                        src={image.preview}
                        alt="dummy"
                        width="300"
                        height="300"
                        className="my-10 mx-5"
                    />
                ) }
            </label>
            <input
                name="image"
                type="file"
                id="upload-button"
                accept="image/*"
                onChange={handlePhotoChange}
            />
            <Button onClick={submit}>
                Save
            </Button>
            
            
        </div>
        
        
    )

}