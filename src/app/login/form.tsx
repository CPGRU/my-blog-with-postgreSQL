'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toast } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';

const FormScheme = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .min(6, "Password must be 6+ characters")
});

type FormData = z.infer<typeof FormScheme>;

export default function LoginForm(){
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormScheme),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FormData)=>{
        console.log('Submitting form:', data);
        
        const { email, password } = data;
        try{
            const response: any = await signIn("credentials", {
                email,
                password,
                // redirect: false,
            });
            console.log({ response });
            if(!response?.error){
                router.push("/");
                router.refresh();
            }

            if(!response.ok){
                throw new Error("Network response was not ok");
            }

            console.log("Login Successful", response);
            toast({ title: "Login Successful" });
        }catch(error: any){
            console.error("Login Failed:", error);
            toast({ title: "Login Failed", description: error.message });
        }
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="mail@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Your password" {...field} type="password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Opening...." : "Open Sesame!"}
                </Button>
            </form>
        </Form>
    )
}