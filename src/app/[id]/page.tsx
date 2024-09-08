import axios from "axios";
import { PostData } from "../lib/definitions";


export async function generateStaticParams() {
    const posts = await axios.get(`${process.env.BASE_URL}/api/getposts`).then((res)=>res.data)
    
    return posts.map((post: PostData) => (
      
      {
      id: post.id?.toString(),
      //id: post.id
    }))
  }


export default async function postPage({ params }: {params: {id: string}}){
    const { id } = params
    const result = await axios.get(`${process.env.BASE_URL}/api/getPostById`, { params: { id: params.id, } })
    console.log(result.data)
    return (
        <div>My post: {params.id}<div>Test: <p dangerouslySetInnerHTML={{ __html: result.data.post_content }}></p></div></div>
        
    )
}