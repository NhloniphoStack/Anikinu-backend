

export function normalise(anime){
    
    function cleanDate(dateobj){

        if(!dateobj?.year || !dateobj?.month || !dateobj?.day){
            return null
        }

        return `${dateobj.year}-${dateobj.month}-${dateobj.day}`

    }
    return{
         anilist_id: anime?.id,
         title_romaji: anime?.title?.romaji,
         title_english: anime?.title?.english,
         title_native: anime?.title?.native,
         description: anime?.description,
         format: anime?.format,
         status: anime?.status,
         isAdult:anime?.isAdult,
         source: anime?.source,
         synonyms: anime?.synonyms,
         site_url: anime?.siteUrl,
         recommendations: anime?.recommendations,
         relations: anime?.relations,
         start_date: cleanDate(anime?.startDate),
         end_date: cleanDate(anime?.endDate),
         episodes: anime?.episodes,
         genres: anime?.genres,
         tags: anime?.tags?.map(tag => tag.name),
         country_of_origin: anime?.countryOfOrigin,
         season: anime?.season,
         season_year: anime?.seasonYear,
         average_score: anime?.averageScore,
         rankings: anime?.rankings,
         popularity: anime?.popularity,
         cover_image: anime?.coverImage?.extraLarge,
         banner_image: anime?.bannerImage,
         

    }

}