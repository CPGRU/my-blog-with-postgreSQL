import pool from '../../lib/db';

export async function GET (){
    
    
    try{
        

        const client = await pool.connect();
        const query = `
            SELECT name, email, password 
            FROM user
            WHERE email=$1
        `;

        const results = await client.query(
            query, 
            [ ]
        );
        client.release();
        return Response.json(results.rows);
    }catch(error){
        console.log(error)
        
    }
    
    return new Response("Success", {
        status: 200
    })
}