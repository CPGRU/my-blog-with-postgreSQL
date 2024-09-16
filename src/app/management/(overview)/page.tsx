import { getServerSession } from "next-auth/next";
import { authConfig } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { PostData } from "@/app/lib/definitions";
import OverviewTable from "@/app/ui/table";

export default async function overviewPage (){
    const session = await getServerSession(authConfig);

    if(!session){
        redirect('/')
    };

    const posts = await axios.get(`${process.env.BASE_URL}/api/blogpost/`).then((res)=>res.data);
    const sortedPosts = posts.sort((a: PostData, b: PostData)=>(a.post_date > b.post_date? -1: 1));

    

    return (
        <div>
            <Link href='/management/create'>Create post</Link>
            <OverviewTable sortedPosts={sortedPosts} />
        </div>
    )
}