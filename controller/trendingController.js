import { db } from "../db/db.js"

export async function getTrendingAnime(req, res){

    const data = await db.query(`SELECT anime.* 
        FROM trending
        INNER JOIN anime
        ON trending.anilist_id = anime.anilist_id;
        `)

    const trendingAnime = data?.rows
    return res.json(trendingAnime)
}