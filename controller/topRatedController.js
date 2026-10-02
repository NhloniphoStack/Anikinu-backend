import { db } from "../db/db.js"

export async function getTopRatedAnime(req, res){

    const data = await db.query(`SELECT anime.* 
        FROM top_rated
        INNER JOIN anime
        ON top_rated.anilist_id = anime.anilist_id;
        `)

    const topRatedAnime = data?.rows
    return res.json(topRatedAnime)
}