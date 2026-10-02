import { db } from "../db/db.js";


export async function getrecentlyCompleted(req, res){
    const data = await db.query(`SELECT anime.* 
        FROM recently_finished
        INNER JOIN anime
        ON recently_finished.anilist_id = anime.anilist_id;
        `)

    const recentlyFinishedAnime = data?.rows
    return res.json(recentlyFinishedAnime)
    
}