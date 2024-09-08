import pool from '../../lib/db';

export async function GET (req: Request){
    const url = new URL(req.url) 
    console.log(url.searchParams)
    const id = url.searchParams.get("id")

    try{
        
        const client = await pool.connect();
        const query = `
            SELECT id, title, post_date, post_image, post_content
            FROM posts 
            WHERE id=${id}
        `;

        const results = await client.query(
            query, 
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