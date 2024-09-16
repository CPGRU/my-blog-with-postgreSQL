import axios from "axios";
import { PostData } from "../lib/definitions";
import Link from "next/link";
import Image from "next/image";


export async function generateStaticParams() {
    const posts = await axios.get(`${process.env.BASE_URL}/api/blogpost`).then((res)=>res.data)
    
    return posts.map((post: PostData) => (
      {
      id: post.id?.toString(),
      //Required parameter(id)is string in generateStaticParams
    }))
  }


export default async function postPage({ params }: {params: {id: string}}){
    const {id} = params;
    const result = await axios.get(`${process.env.BASE_URL}/api/blogpost/${params.id}`);
    const { title, post_date, post_content} = result.data;
    return (
      <div>
        <div className="grid justify-center">
          <Link href="/" className="ml-10">
            <Image src='/logo.png' alt='logo' width={200} height={200} className="inline"/>
          </Link>
        </div>
        <div className="px-44 ">
          <p className="text-sm text-slate-500">{post_date.split('T')[0]}</p>
          <h1 className="font-bold text-3xl tracking-wide text-center mt-3 mb-8">{title}</h1>
          
          <div dangerouslySetInnerHTML={{ __html: post_content }} className="indent-8 "></div>
        </div>
      </div>
      
        
    )
}