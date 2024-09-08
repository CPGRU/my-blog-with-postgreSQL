
import * as crypto from 'crypto';
import path from "path";
import { writeFile } from "fs/promises";

type File = {
    name: string,
    arrayBuffer: () =>Promise<ArrayBuffer>
}

export const md5 = (contents: crypto.BinaryLike) => crypto.createHash('md5').update(contents).digest("hex");

export async function POST (
    req: Request, 
){
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if(!file){
        return Response.json(
            {error: 'No file received.'},
            {status: 400}
        );
    };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = md5(buffer)

    try {
        // Write the file to the specified directory (public/assets) with the modified filename
        await writeFile(
          path.join(process.cwd(), "public/assets/" + filename),
          buffer
        );
    
        // Return a JSON response with a success message and a 201 status code
        return Response.json({ Message: "Success", file: filename, status: 201 });
      } catch (error) {
        // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
        console.log("Error occurred ", error);
        return Response.json({ Message: "Failed", status: 500 });
      }
}