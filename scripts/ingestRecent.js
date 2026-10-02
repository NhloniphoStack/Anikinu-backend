import { getRecent } from "../services/anilistServices.js";
import { db } from "../db/db.js";
import { normaliseTrending } from "../util/normaliseTrending.js";

export async function ingestRecent(){
    try{

        const anime = await getRecent()

        const normalisedAnime = anime?.map(normaliseTrending)

        for(const { anilist_id } of normalisedAnime){

            if(!anilist_id){
                console.log("anime skipped")
                continue;
            }

            await db.query(`INSERT INTO recently_finished
                 (anilist_id) 
                 VALUES ($1)
                 ON CONFLICT(anilist_id)
                 DO UPDATE SET
                 updated_at = CURRENT_TIMESTAMP
                `, [anilist_id])

            
        }

        console.log("Done updating recent ☑")

    }catch(err){
        console.log(`Something went wrong:`, err)
        return err
    }
    
     
}







