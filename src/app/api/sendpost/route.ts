import { title } from 'process';
import conn from '../../lib/db';
import pool from '../../lib/db';
import { formData, zfd } from 'zod-form-data';
import { z } from 'zod'

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
        console.log(jsonData)
        const title = jsonData.title;
        const post_content = jsonData.post_content;
        const post_date = jsonData.post_date

        
        const query = `INSERT INTO posts(title, post_content, post_date) VALUES($1, $2, $3)`;
        const result = await pool.query(
            query,
            [title, post_content, post_date]
        );
        
        
        console.log( "ttt",result );

        
    } catch ( error ) {
        console.log( error );
    }
    
      return new Response("Success", {
        status: 200
    })  
        
};