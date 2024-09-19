import { Suspense } from "react";
import PostCards from "./ui/postCards";
import NavBar from "./navbar";
import Loading from "./loading";
import React from "react";



export default function Home() {
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
                About Us
              </h2>
              <p className="text-base text-slate-700">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
              </p>
            </div>
          </div>
        </div>
        <div>
          <Suspense fallback={<Loading />}>
            <PostCards />
          </Suspense>  
        </div>
      </div>
    </main>
  )
};
