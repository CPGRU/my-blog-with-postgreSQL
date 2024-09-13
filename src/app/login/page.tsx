import {getServerSession} from "next-auth/next"
import { redirect } from "next/navigation";
import LoginForm from "./form";
import { authConfig } from "../api/auth/[...nextauth]/route";


export default async function LoginPage() {
    const session = await getServerSession(authConfig);

     if(session){
         redirect('/');
     }

    return (
        <section className="bg-black h-screen flex items-center justify-center">
            <div className="w-[600px]">
                <LoginForm />
            </div>
        </section>
    )
}

/*
import { signIn } from "@/auth";
import Image from "next/image";3000
     
    const [ errorMessage, formAction, isPending ] = useActionState(
        authenticate,
        undefined
    )
        
    
    const formAction = async (formData: FormData) =>{
        'use server'
        //const email = formData.get('email');
        //const password = formData.get('password')
        try{
            await signIn('credentials', formData
                {
                email,
                password,
                redirect: false
            }
                 )
                
        }catch(error){
            console.error('Login Failed: ', error)
        }
        
    }
   

    return (
        <main className="container mx-auto">
            <div className="grid items-center justify-items-center">
                <div className="w-auto text-white h-32 mb-5">
                    <Image src='/logo.png' alt='logo' width={200} height={200} />
                </div>
                <form 
                    className="grid justify-items-center" 
                    action={ formAction }
                >
                    <div className="mt-2">
                        <input type="email" name="email" placeholder="Email" className="border-2 rounded-md border-indigo-700"/>
                    </div>
                    <div className="mt-2">
                        <input type="password" name="password" placeholder="Password" className="border-2 rounded-md border-indigo-700"/>
                    </div>
                    <button className="rounded-md bg-indigo-500 px-4 py-2 mt-2 font-bold text-white">
                        Log in
                    </button>
                    
                </form>
            </div>
                    
               
        </main>
    )
}
*/