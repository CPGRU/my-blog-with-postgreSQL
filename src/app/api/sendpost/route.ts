import { getServerSession } from "next-auth/next";
import { authConfig } from "../auth/[...nextauth]/route";
import pool from '../../lib/db';

export async function POST (
    req: Request ,
){  
    
    const session = await getServerSession( authConfig);

    if (!session) {
        return new Response('You must be logged in', {
            status: 401
        })
    };
    

    if(!req.body){
        return new Response('request body is empty', {
            status: 400
        })
    };
    try {
        const jsonData = await req.json();
        const title = jsonData.title;
        const post_content = jsonData.post_content;
        const post_date = jsonData.post_date;
        const post_image = jsonData.post_image;
        const post_theme = jsonData.post_theme;

        const query = `
            INSERT INTO posts(title, post_content, post_date, post_image, post_theme) 
            VALUES($1, $2, $3, $4, $5)
        `;

        const result = await pool.query(
            query,
            [title, post_content, post_date, post_image, post_theme]
        );
        console.log( "ttt",result );  
    } catch ( error ) {
        console.log( error );
    }
      return new Response("Success", {
        status: 200
    })  
};