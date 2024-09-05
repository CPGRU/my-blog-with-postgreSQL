'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PostData } from "../lib/definitions";


export default function Home() {
  const [ posts, setPosts ] = useState<PostData[]>([]);

 
  useEffect(()=>{
    async function fetchPosts(){
      const res = await axios.get('/api/getposts');
      const sortedPosts = res.data.sort((a: PostData, b: PostData)=>(a.post_date > b.post_date? -1: 1))
      setPosts(sortedPosts)
    }
    fetchPosts()
  }, [])
    /*
  const fetchPosts = async ()=>{
    const res = await axios.get('/api/getposts');
    const sortedPosts = res.data.sort((a: PostData, b: PostData)=>(a.post_date > b.post_date? -1: 1))
      setPosts(sortedPosts)
  }
  fetchPosts()
  */ 
  const renderedPosts = posts.map((post)=>{
    return (
      <div key={post.id} className="w-full px-4">
        <div className="mb-10 w-full">
          <div className="mb-8 overflow-hidden rounded">
            <Image 
              src={`/assets/${post.post_image}`} 
              alt={`${post.post_theme} image`} 
              width={500} 
              height={500} 
              className="w-96" 
              
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
  

  return (
    <main>
      <div className="container mx-auto">
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
        <div className="grid grid-cols-3 gap-4">
          {renderedPosts}
        </div>
      </div>
    </main>
  )
}