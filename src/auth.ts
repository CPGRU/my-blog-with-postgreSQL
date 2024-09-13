import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import pool from './app/lib/db';

async function getUser(email: string){
    try {
        const client = await pool.connect();
        const query = `
            SELECT email, password 
            FROM user
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
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {},
        },

        async authorize(credentials){
            const parsedCredentials = z
                .object(
                    { 
                        email: z.string().email(), 
                        password: z.string().min(6) 
                    })
                .safeParse(credentials);
            

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordMatch = await bcrypt.compare(password, user.password);
                if(passwordMatch)return user;
            }
            console.log('Invalid credentials')
            return null;
        } 
    })
  ]
});