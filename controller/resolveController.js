import { db } from "../db/db.js"

export async function resolveAnime(req, res){
    if(!req?.body){
        return res.status(400).json({error: "Field required for fetch"})
    }

    const { ids } = req?.body
    
    
    if(!Array.isArray(ids)){
        return res.status(400).json({error: "An array is required!"})
    }

    const dbData = await db.query(`SELECT id, anilist_id, title_romaji, title_english, cover_image FROM anime
        WHERE anilist_id = ANY($1)`, [ids])

    const anime = dbData?.rows

    return res.json(anime)
}