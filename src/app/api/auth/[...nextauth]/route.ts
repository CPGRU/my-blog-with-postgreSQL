import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import pool from '../../../lib/db';

const bcrypt = require('bcrypt');

async function getUser(email: string){
    try {
        const client = await pool.connect();
        console.log(client);
        const query = `
            SELECT email, password 
            FROM public.user
            WHERE email=$1
        `;

        const results = await client.query(
            query, 
            [email]
        );
        client.release();
        return results.rows[0];
    }catch (err){
        console.log('Failed to fetch user: ', err)
    }
};

export const authConfig = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req){
                const email = credentials?.email;
                const user = await getUser(email as string);
                if (!user){
                    throw new Error("Invalid email")
                };
                const passwordCorrect = await bcrypt.compare(
                    credentials?.password ||"",
                    user.password
                );
                if(!passwordCorrect){
                    throw new Error("Invalid password")
                }
              
                return {
                    id: user.email as string,
                    email: user.email as string
                }
            },
        }),
    ], 
  } satisfies NextAuthOptions;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST}