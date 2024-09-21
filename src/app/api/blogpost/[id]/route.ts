import pool from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../auth/[...nextauth]/route";
//import fs from "fs";
import path from "path";



export async function GET (
    _: Request,
    { params }: {params: {id: string}}
){
    try{
        
        const client = await pool.connect();
        const query = `
            SELECT id, title, post_date, post_image, post_content
            FROM posts 
            WHERE id=$1
        `;

        const results = await client.query(
            query, 
            [params.id]
        );
        client.release();

        if(!results.rows.length){
            return new Response("Not found", {
                status: 404
            })
        }
        return Response.json(results.rows[0]);

    }catch(error){
        console.log(error)
        
    }
    
    return new Response("Success", {
        status: 200
    })
};

export async function PUT( 
    req: Request,  
    { params }: {params: {id: string}} 
){
    const session = await getServerSession( authConfig);

    if (!session) {
        return new Response('You must be logged in', {
            status: 401
        })
    };

    try {
        const jsonData = await req.json();
        const updatedTitle = jsonData.title;
        const updatedDate = jsonData.post_date;
        const updatedContent = jsonData.post_content
        
        const client = await pool.connect();
        
        const query = `
            UPDATE posts
            SET title=$1, post_date=$2, post_content=$3
            WHERE id=$4
        `;

        await client.query(
            query, 
            [updatedTitle, updatedDate, updatedContent, params.id]
        );
        client.release();
        
        return new Response("", {status: 200});
    }catch (err){
        console.log('Failed to update post: ', err)
        return new Response('Failed to update post', {status: 500});
    }
    
};

const { unlink } = require('node:fs/promises');

async function deleteImageFromFs(post_image: string){
    const imagesPath = path.join(process.cwd(), 'public/assets', post_image);
    try{
        await unlink(imagesPath);
        console.log(`successfully deleted ${imagesPath}`)
    }catch(error){
        console.error('there was an error:', error)
    }
};

export async function DELETE(
    _: Request,  
    { params }: {params: {id: string}}
){
    const session = await getServerSession( authConfig);

    if (!session) {
        return new Response('You must be logged in', {
            status: 401
        })
    };

    try {
        const client = await pool.connect();

        let query = `
            select post_image 
            FROM posts
            WHERE id=$1
        `;

        const image_result = await client.query(
            query, 
            [params.id]
        );

        deleteImageFromFs(image_result.rows[0].post_image)
        
        query = `
            DELETE 
            FROM posts
            WHERE id=$1
        `;

        await client.query(
            query, 
            [params.id]
        );
        
        client.release();

        return new Response("", {status: 200});

    }catch (err){
        console.log('Failed to fetch user: ', err)
        return new Response('Failed to fetch user', {status: 500});
    }
};