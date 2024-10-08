'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PostData } from "../lib/definitions";
import axios from "axios";
import Link from "next/link";


interface PostDataProps{
    sortedPosts: PostData[];
};

export default function OverviewTable({sortedPosts }: PostDataProps){
    const router = useRouter()

    const handleDelete = async (id?: number) =>{
        //const { post_image} = await axios.get(`/api/blogpost/${id}`).then((res)=>res.data);
        

        await axios.delete(`/api/blogpost/${id}/`).then((res)=>{
            console.log(res);
            router.refresh();
        });
    };

    const renderedPosts = sortedPosts.map((post: PostData)=>{
        return (
            <tr key={post.id}>
                <td>{post.post_date.split('T')[0]}</td>
                <td className="text-center">{post.post_theme}</td>
                <td>{post.title}</td>
                <td className="flex justify-between">
                    <Button onClick={()=>handleDelete(post.id)}>Delete</Button>
                    <Button>
                        <Link href={`/management/edit/${post.id}`}>
                            Edit
                        </Link>
                    </Button>
                </td>
            </tr>                
        )
    });
    
    return (
        <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <table className="w-full table-auto">
                        <thead className="text-center bg-indigo-500 text-white font-bold">
                            <tr>
                                <th className="w-32">Date</th>
                                <th className="w-32">Theme</th>
                                <th>Title</th>
                                <th>Statement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderedPosts}
                        </tbody>
                    </table>
                </div>
            </div>
    )
};