import { getAnime } from "../services/anilistServices.js";
import { db } from "../db/db.js";
import { normalise } from "../util/normalise.js";
import { checkDbConnection } from "../util/checkDbConnection.js";


export async function ingestAnime(){
    const dbData = await db.query(`SELECT * FROM anime`)
    const target = 2000

    const animeData = dbData?.rows

    const checkConnection = await checkDbConnection()
   
    for(let page = 10;page < 100;page++){
        const anime = await getAnime(page)
        console.log(`page: ${page}`)

        let normalizedAnime;

        try{

             normalizedAnime = anime?.map(normalise)

        }catch(error){
            console.log('Ingestion of this anime failed')
            continue;
        }
        
       
        for(const {anilist_id,
             title_english,
              description,
              title_romaji,
              title_native,
              format,
              status,
              isAdult,
              source,
              recommendations,
              relations,
              synonyms,
              site_url,
              genres,
              tags,
              country_of_origin,
              start_date,
              end_date,
              episodes,
              season,
              season_year,
              average_score,
              rankings,
              popularity,
              cover_image,
              banner_image
            } of normalizedAnime){

                if(!anilist_id){
                    console.log("anime skipped")
                    continue;
                }

                if(!title_english && !title_native && !title_romaji){
                    console.log("anime skipped")
                    continue;
                }

                if(!cover_image && !banner_image){
                    console.log("anime skipped")
                    continue;
                }

                if(!checkConnection){
                    return 'Database connection lost'
                }

                try{

                    await db.query(`INSERT INTO anime 
                (anilist_id,
              title_english,
              description,
              title_romaji,
              title_native,
              format,
              genres,
              tags,
              country_of_origin,
              status,
              isAdult,
              source,
              recommendations,
              relations,
              synonyms,
              site_url,
              start_date,
              end_date,
              episodes,
              season,
              season_year,
              average_score,
              rankings,
              popularity,
              cover_image,
              banner_image
                    ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
                ON CONFLICT (anilist_id)
                DO UPDATE SET
                average_score = EXCLUDED.average_score,
                status = EXCLUDED.status,
                popularity = EXCLUDED.popularity,
                episodes = EXCLUDED.episodes,
                updated_at = CURRENT_TIMESTAMP
                `, [
                    anilist_id,
              title_english,
              description,
              title_romaji,
              title_native,
              format,
              genres,
              tags,
              country_of_origin,
              status,
              isAdult,
              source,
              recommendations,
              relations,
              synonyms,
              site_url,
              start_date,
              end_date,
              episodes,
              season,
              season_year,
              average_score,
              rankings,
              popularity,
              cover_image,
              banner_image

                ])
             

                }catch(err){
                    console.log('Something went wrong:', err)
                    break
                    return console.log("Cancelled")
                }

            
            
        }
    }



    console.log("Done ☑")
}






