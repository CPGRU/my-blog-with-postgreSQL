import { getServerSession } from "next-auth/next";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "./form";

export default async function LoginPage() {
    const session = await getServerSession(authConfig);

    if(session){
        redirect('/management');
    }

    return (
        <section className="bg-black h-screen flex items-center justify-center">
            <div className="w-[600px]">
                <LoginForm />
            </div>
        </section>
    )
};