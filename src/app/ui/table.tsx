'use client';

import { Button } from "@/components/ui/button";
import { PostData } from "../lib/definitions";
import axios from "axios";
import pool from '../../app/lib/db';

interface PostDataProps{
    sortedPosts: PostData[];
    
}

export default function OverviewTable({sortedPosts }: PostDataProps){

    const handleDelete = async (id?: number) =>{
        await axios.delete(`/api/blogpost/${id}/`)
    };

    const renderedPosts = sortedPosts.map((post: PostData)=>{
        return (
            <tr key={post.id}>
                <td>{post.post_date.split('T')[0]}</td>
                <td>{post.post_theme}</td>
                <td>{post.title}</td>
                <td>
                    <Button onClick={()=>handleDelete(post.id)}>Delete</Button>
                    <Button>Edit</Button>
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
                                <th>Date</th>
                                <th>Theme</th>
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
}