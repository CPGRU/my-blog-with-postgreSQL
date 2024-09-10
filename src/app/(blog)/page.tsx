import axios from "axios";
import { PostData } from "../lib/definitions";
import PostCards from "../ui/postCards";
import NavBar from "../navbar";


export default async function Home() {
  const posts = await axios.get(`${process.env.BASE_URL}/api/getposts`).then((res)=>res.data);
  const sortedPosts = posts.sort((a: PostData, b: PostData)=>(a.post_date > b.post_date? -1: 1))

  return (
    <main>
      
      <div className="container mx-auto">
        <div><NavBar /></div>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-indigo-700">
                Our Blogs
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark">
                New Articles
              </h2>
              <p className="text-base text-slate-700">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <PostCards sortedPosts={sortedPosts}/>
        </div>
      </div>
    </main>
  )
}