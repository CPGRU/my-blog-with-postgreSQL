import { Button } from "@/components/ui/button";
import Nav from "../management/nav";

export function CardSkeleton (){
    return (
        <div  className="w-full px-4 ">
            <div className="mb-10 w-full">
                <div className="mb-8 overflow-hidden rounded">
                    <div className="flex h-80 w-full items-center justify-center bg-gradient-to-r from-slate-100 to-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between ">
                        <span className="mb-5 inline-block rounded bg-gradient-to-r from-indigo-100 to-indigo-400 px-4 py-1 w-28 h-8"></span>
                        <span className="mb-5 inline-block rounded bg-gradient-to-r from-red-100 to-red-400 px-4 py-1 w-16"></span>
                    </div>
                    <div>
                        <span className="inline-block rounded bg-gradient-to-r from-slate-100 to-slate-400 w-full">...</span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export function CardsSkeleton(){
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
};

export function TdSkeleton (){
    return (
        <tr className="bg-gradient-to-r from-slate-100 to-slate-400">
            <td></td>
            <td></td>
            <td></td>
            <td className="flex justify-between">
                <Button>Delete</Button>
                <Button>Edit</Button>
            </td>
        </tr>
    )
};

export function TableSkeleton (){
    return (
        <>
            <Nav>{<div className="bg-gradient-to-r from-slate-100 to-slate-400 w-32"></div>}</Nav>
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <table className="w-full table-auto">
                        <thead className="text-center bg-indigo-500 text-white font-bold">
                            <tr>
                                <th className="w-32">Date</th>
                                <th className="w-32">Theme</th>
                                <th>Title</th>
                                <th className="w-36">Statement</th>
                            </tr>
                        </thead>
                        <tbody >
                            <TdSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};