import { db } from "../db/db.js";

export async function getUpcoming(req, res){

    const dbData = await db.query(`
        SELECT * FROM anime 
        WHERE status = 'NOT_YET_RELEASED' 
        AND start_date IS NOT NULL
        
        `)

    const anime = dbData?.rows

    return res.json(anime)
    
}