import { title } from 'process';
import conn from '../../lib/db';
import pool from '../../lib/db';
import { formData, zfd } from 'zod-form-data';
import { z } from 'zod'


const schema = zfd.formData({
            title: zfd.text(z.string()),
            post_content: zfd.text(z.string())
        });



export async function POST (
    req: Request ,
    res: Response
){
    if(!req.body){
        return new Response('request body is empty', {
            status: 400
        })
    }
    
    try {
        
        const jsonData = await req.json();
        const title = jsonData.title;
        const post_content = jsonData.post_content;

        
        const query = `INSERT INTO posts(title, post_content) VALUES($1, $2)`;
        const result = await pool.query(
            query,
            [title, post_content]
        );
        
        
        console.log( "ttt",result );

        
    } catch ( error ) {
        console.log( error );
    }
    
      return new Response("Success", {
        status: 200
    })  
        
};