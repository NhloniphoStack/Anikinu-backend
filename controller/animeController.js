import { format } from "node:path";
import { db } from "../db/db.js";
import { sentenceCase } from "sentence-case";

function includesWhere(string){

    if(string.includes("WHERE")){
       return true
    }

    return false

}

export async function getAllAnime(req, res){

    let { page,
         limit,
          status,
           season,
            year,
             format,
              search,
               genres,
                country,
                tags,
                sortBy
             } = req?.query

    page = page ? page : 1

  
   const sortOptions = {
    popularity: `popularity DESC`,
    score: `average_score DESC`,
    newest:`season_year DESC`
    
   }

   const sort = sortOptions[sortBy] || sortOptions.popularity
     
   
     if(!Array.isArray(genres)){
        genres = genres?.split(', ')
     }
    tags = tags?.split(', ')

    season = season?.toUpperCase()

    search = search?.trim()

    country = country?.toUpperCase()

     

    

    status = status?.toUpperCase()

    
    

    format = format?.toUpperCase()

    year = parseInt(year)

    limit = limit ? limit : 20

    let offset = (page - 1) * limit

   let query = `SELECT *, COUNT(*) OVER() AS total_count FROM anime`
   let params = []


    if(status){

    if(!includesWhere(query)){
        query += ` WHERE status = $${params.length + 1}`
    }else{
        query += ` AND status = $${params.length + 1}`
    }
    
    params.push(status)
   }

   if(season){

    if(!includesWhere(query)){
        query += ` WHERE season = $${params.length + 1}`
    }else{
        query += ` AND season = $${params.length + 1}`
    }
    
    params.push(season)
   }

   if(search){

    search = sentenceCase(search)

    if(!includesWhere(query)){
        query += ` WHERE title_english LIKE $${params.length + 1}
         OR title_romaji LIKE $${params.length + 1}
          OR title_native LIKE $${params.length + 1}`
    }else{
        query += ` AND title_english LIKE $${params.length + 1}
         OR title_romaji LIKE $${params.length + 1} OR 
         title_native LIKE $${params.length + 1}`
    }
    
    params.push(`%${search}%`)
   }

   if(year){

    if(!includesWhere(query)){
        query += ` WHERE season_year = $${params.length + 1}`
    }else{
        query += ` AND season_year = $${params.length + 1}`
    }
    
    params.push(year)
   }

     if(tags){

    if(!includesWhere(query)){
        query += `  WHERE tags @> $${params.length + 1} `
        
    }else{
        query += ` AND tags @> $${params.length + 1}`
    }
   
    params.push(tags)
   }

  

    if(format){

    if(!includesWhere(query)){
        query += ` WHERE format = $${params.length + 1}`
    }else{
        query += ` AND format = $${params.length + 1}`
    }
    
    params.push(format)
   }



    if(country){

    if(!includesWhere(query)){
        query += ` WHERE country_of_origin = $${params.length + 1}`
    }else{
        query += ` AND country_of_origin = $${params.length + 1}`
    }
    
    params.push(country)
   }


    if(genres){

    if(!includesWhere(query)){
        query += `  WHERE genres @> $${params.length + 1} `
        
    }else{
        query += ` AND genres @> $${params.length + 1}`
    }
   
    params.push(genres)
   }

    if(sortBy){
        
      
        query += ` ORDER BY ${sort}`
      
     
    
    
   
   }


   if(page){
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    
    params.push(limit, offset)
    
   }

   

   
    const animeData = await db.query(query, params)


    const anime = animeData.rows

    

   const dbData = await db.query(`SELECT COUNT(*) FROM anime`)
   
   
   const countResults = animeData?.rows[0]?.total_count
      
   let totalPages = (countResults / limit).toFixed(0)

   totalPages = parseInt(totalPages)


    return res.json({
        data: anime,
        pagination: {
            page: parseInt(page),
            totalPages: totalPages,
            limit: parseInt(limit),
            totalAnime: parseInt(countResults)
        }
    })

}


export async function getAnime(req, res){
    let { animeid } = req.params

    animeid = parseInt(animeid)

    if(Number.isNaN(animeid)){
        return res.status(400).json({error: 'Invalid Request!'})
    }



    const dbData = await db.query(`SELECT * FROM anime 
        WHERE id = $1`, [animeid])

    const anime = dbData?.rows[0]

    if(!anime){
        return res.status(404).json({error: "No such anime exist!"})
    }

    return res.json(anime)


}

export async function getRandom(req, res){
    const dbData = await db.query(`SELECT * FROM anime ORDER BY RANDOM() LIMIT 1`)

    const random = dbData?.rows[0]

    return res.json(random)
}




