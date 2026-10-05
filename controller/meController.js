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
    let { animeID, status } = req.body || {}

    if(!animeID){
        return res.status(400).json({error: 'Provide the required field!'})
    }

    animeID = parseInt(animeID)

    if(Number.isNaN(animeID)){
       return res.status(400).json({error: 'Please enter a valid data type!'})
    }

    try{

        await db.query(`INSERT INTO users_anime
         (user_id, anime_id, status) 
         VALUES ($1, $2, $3)
        `, [userID, animeID, status])

        console.log("anime inserted")

        return res.json({message: 'Anime inserted!'})

    }catch(error){
        return res.status(500).json({error: 'failed to ingest list'})
    }

    
}

export async function getStats(req, res){
    const userID = req.session.userID

    const totalAnime = await db.query(`
        SELECT COUNT(*) OVER() AS total_anime FROM users_anime
        WHERE user_id = $1
        `, [userID])

    const watchingAnime = await db.query(`
        SELECT COUNT(*) AS watching_anime FROM users_anime
        WHERE status = 'WATCHING' AND user_id = $1
        `, [userID])

    const completed = await db.query(`
        SELECT COUNT(*) AS completed_anime FROM users_anime
        WHERE status = 'COMPLETED' AND user_id = $1
        `, [userID])

    const planning = await db.query(`
        SELECT COUNT(*) AS planning_anime FROM users_anime
        WHERE status = 'PLANNING' AND user_id = $1
        `, [userID])

         const dropped = await db.query(`
        SELECT COUNT(*) AS dropped_anime FROM users_anime
        WHERE status = 'DROPPED' AND user_id = $1
        `, [userID])


    return res.json({
        total_Anime: Number(totalAnime?.rows[0]?.total_anime )|| 0,
        watching_Anime: Number(watchingAnime?.rows[0]?.watching_anime) || 0,
        completed_Anime: Number(completed?.rows[0]?.completed_anime) || 0,
        planning_Anime: Number(planning.rows[0]?.planning_anime) || 0,
        dropped_Anime: Number(dropped?.rows[0]?.dropped_anime) || 0
    })
}

export async function editList(req, res){
    let { animeid,  status } = req.body
    const userID = req?.session?.userID
    
    await db.query(`
        UPDATE users_anime
         SET status = $1 
         WHERE anime_id = $2 
         AND user_id = $3
         `, [status, animeid, userID])

        
    return res.json({message: 'List updated'})
}


export async function getItem(req, res){
 
     const userID = req?.session?.userID 
   
   let { animeid } = req?.params

   animeid = parseInt(animeid)

   if(!animeid){
    return res.status(400).json({error: 'Field is requres'})
   }
      
    const dbData = await db.query(`
         SELECT
         users_anime.user_id AS user_id, users_anime.status, anime.id AS anime_id,
          anime.title_english, anime.title_romaji, anime.cover_image 
          FROM users_anime
          INNER JOIN
          anime ON anime.id = users_anime.anime_id
          WHERE users_anime.user_id = $1
          AND users_anime.anime_id = $2
          `, [userID, animeid])

          
    return res.json(dbData?.rows)
}

export async function removeItem(req, res){
    const userID = req?.session?.userID 
   
   let { animeid } = req?.params

   animeid = parseInt(animeid)

   if(!animeid){
    return res.status(400).json({error: 'Field is requres'})
   }

    const existing = await db.query(`
        SELECT* FROM users_anime 
        WHERE anime_id = $1
        AND user_id = $2
        `, [animeid, userID])

    if(!existing?.rows[0]){
            return res.json({error: 'No such item to remove'})
        }

   await db.query(`
    DELETE FROM users_anime
     WHERE user_id = $1 
     AND anime_id = $2
     `, [userID, animeid])

    

       

     return res.json({message: 'Item removed'})
}