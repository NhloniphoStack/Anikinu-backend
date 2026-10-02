import { db } from "../db/db.js";

export async function getUser(req, res){

    const userId = req?.session?.userID

        const dbData = await db.query('SELECT * FROM users WHERE id = $1', [userId])

        const user = dbData.rows[0]

        return res.json(user)

}

export async function getUserList(req, res){

   const userID = req?.session?.userID 
   
   let { status } = req?.query 

   let query = `SELECT
         users_anime.user_id AS user_id, users_anime.status, anime.id AS anime_id,
          anime.title_english, anime.title_romaji, anime.cover_image 
          FROM users_anime
          INNER JOIN
          anime ON anime.id = users_anime.anime_id
          WHERE users_anime.user_id = $1
           `
   let params = [userID]

   if(status){
    query +=   ` AND users_anime.status = $2`
    params.push(status)
   }

    const dbdata = await db.query(query, params)

        return res.json(dbdata?.rows)
}

export async function addAnime(req, res){
    const userID = req?.session?.userID
    let { animeID } = req.body || {}

    if(!animeID){
        return res.status(400).json({error: 'Provide the required field!'})
    }

    animeID = parseInt(animeID)

    if(Number.isNaN(animeID)){
       return res.status(400).json({error: 'Please enter a valid data type!'})
    }

    try{

        await db.query(`INSERT INTO users_anime
         (user_id, anime_id) 
         VALUES ($1, $2)
        `, [userID, animeID])

        console.log("anime inserted")

        return res.json({message: 'Anime inserted!'})

    }catch(error){
        return res.status(500).json({error: 'failed to ingest list'})
    }

    
}