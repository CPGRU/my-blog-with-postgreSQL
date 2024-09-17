import { getServerSession } from "next-auth/next";
import { authConfig } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import Nav from "../nav";
import Form from "../../ui/create-form"

export default async function CreatePage() {
  const session = await getServerSession(authConfig);

  if(!session){
    redirect('/')
  };

  const backToOverview = (
    <div>
        <Link href='/management' className="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z" clipRule="evenodd" />
          </svg>
          <span className="ml-2">Back</span>
        </Link>
    </div>
)

  return (
    <div className="container mx-auto">
      <Nav>{backToOverview}</Nav>
      <Form />
    </div>
  )
};
