import { getServerSession } from "next-auth/next";
import { authConfig } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Form from "../../ui/create-form"
export default async function CreatePage() {
  const session = await getServerSession(authConfig);

  if(!session){
    redirect('/')
  };

  return (
    <div className="container mx-auto">
      <div>Create a blog post</div>
        <Form />
      </div> 
  )
};
