import pool from '../../../lib/db';

export async function GET (_: Request,{ params }: {params: {id: string}}){

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
}
export async function PUT( req: Request,  { params }: {params: {id: string}} ){

    try {
        const jasonData = await req.json();
        console.log(jasonData.title)
        /*

        const client = await pool.connect();
        
        const query = `
            UPDATE posts
            SET 
            WHERE id=$1
        `;

        await client.query(
            query, 
            [params.id]
        );
        client.release();
        */
        return new Response("", {status: 200});
    }catch (err){
        console.log('Failed to fetch user: ', err)
        return new Response('Failed to fetch user', {status: 500});
    }
    
}

export async function DELETE(req: Request,  { params }: {params: {id: string}}){

    try {
        const client = await pool.connect();
        
        const query = `
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
}