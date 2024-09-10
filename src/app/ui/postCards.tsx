import Image from "next/image";
import Link from "next/link";
import { PostData } from "../lib/definitions"

interface PostDataProps {
    sortedPosts: PostData []
}

export default function postCards({ sortedPosts }: PostDataProps){
    const renderedPosts = sortedPosts.map((post: PostData)=>{
        return (
          <div key={post.id} className="w-full px-4 ">
            <div className="mb-10 w-full">
              <div className="mb-8 overflow-hidden rounded">
                <Image 
                  src={`/assets/${post.post_image}`} 
                  alt={`${post.post_theme} image`} 
                  width={500} 
                  height={500} 
                  className="h-80" 
                  
                  sizes="(min-width: 8080px) 50vw,100vw"/>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="mb-5 inline-block rounded bg-indigo-400 px-4 py-1 text-center text-xs font-semibold text-white leading-loose">
                    {post.post_date.split('T')[0]}
                  </span>
                  <span className="mb-5 inline-block rounded bg-red-400 px-4 py-1 text-center text-xs font-semibold text-white leading-loose">
                    {post.post_theme}
                  </span>
                </div>
                <h3>
                  <Link href={`/${post.id}`} className="mb-4 inline-block text-xl font-semibold text-black hover:text-indigo-700">
                    {post.title}
                  </Link>
                </h3>
                
              </div>
            </div>
          </div>
        )
      })
    return <>{renderedPosts}</>
}