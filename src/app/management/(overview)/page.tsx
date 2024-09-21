
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { PostData } from "@/app/lib/definitions";
import OverviewTable from "@/app/ui/table";
import Nav from "../nav";
import Loading from "../loading";


export default async function overviewPage (){
    const session = await getServerSession(authConfig);

    if(!session){
        redirect('/')
    };

    const posts = await axios.get(`${process.env.BASE_URL}/api/blogpost/`).then((res)=>res.data);
    const sortedPosts = posts.sort((a: PostData, b: PostData)=>(a.post_date > b.post_date? -1: 1));

    const createButton = (
        <div>
            <Link href='/management/create' className="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                </svg>
                <span className="ml-2">Create post</span>
            </Link>
        </div>
    )

    return (
        <div className="container mx-auto">
            <Nav>{createButton}</Nav> 
            <Suspense fallback={<Loading />}>
                <OverviewTable sortedPosts={sortedPosts} />
            </Suspense>   
        </div>
    )
}