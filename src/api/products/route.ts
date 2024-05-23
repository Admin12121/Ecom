import { NextResponse } from "next/server"
import db from "../../config/db"


export async function GET() {
    try {
        const res = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM users_projects", (err: any, results: [])=>{
                if(err){
                    reject(err);
                } else{
                    resolve(results)
                }
            });
        });
    } catch (error) { 
        return NextResponse.json(
            {message : error},
            {
                status: 500
            }
        )
    }
    
}