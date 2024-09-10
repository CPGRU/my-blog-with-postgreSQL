import Image from "next/image"

export default function LoginPage(){
    return (
        <main className="container mx-auto">
            <div className="grid items-center justify-items-center">
                <div className="w-auto text-white h-32 mb-5">
                    <Image src='/logo.png' alt='logo' width={200} height={200} />
                </div>
                <form className="grid justify-items-center">
                    <div className="mt-2">
                        <input type="email" placeholder="Email" className="border-2 rounded-md border-indigo-700"/>
                    </div>
                    <div className="mt-2">
                        <input type="password" placeholder="Password" className="border-2 rounded-md border-indigo-700"/>
                    </div>
                    <button className="rounded-md bg-indigo-500 px-4 py-2 mt-2 font-bold text-white">Log in</button>
                </form>
            </div>
                    
               
        </main>
    )
}