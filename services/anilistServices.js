import { delay } from "../util/delay.js";
import { getFullYear } from "../util/getFullYear.js";


//UPDATED_AT_DESC
const query = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(type: ANIME, sort: UPDATED_AT_DESC) {
      id
      title {
        romaji
        english
        native
      }
      episodes
      popularity
      relations {
      edges {
      relationType
      node {
      id
      }
      }
      }
      format
      tags {
      category
      name
      }
      genres
      countryOfOrigin
      recommendations {
      nodes {
      rating
      mediaRecommendation {
      id
      }
      }
      }
      bannerImage
      rankings {
        context
        rank
      }
      startDate {
      year
      month
      day
      }
      endDate {
      year
      month
      day
      }
      averageScore
       rankings {
        context
        rank
      }
      nextAiringEpisode {
        episode
        airingAt
      }
      episodes
      description
      rankings {
        context
        rank
      }
      status
      season
      isAdult
      source
      synonyms
      siteUrl
      seasonYear
      coverImage {
        extraLarge
      }
    }
  }
}
`; 

const trendingQuery = `
query ($page: Int, $perPage: Int, $sort: [MediaSort], $seasonYear: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(type: ANIME, sort: $sort, seasonYear: $seasonYear) {
      id
      rankings {
        context
        rank
      }
      averageScore
    }
  }
}
`


const recentQuery  = `
query ($page: Int, $perPage: Int, $search: String, $seasonYear: Int, $season: MediaSeason, $status: MediaStatus, $genres: [String], $sort: [MediaSort], $isAdult: Boolean, $countryOfOrigin: CountryCode, $tags: [String]) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $search, type: ANIME, seasonYear: $seasonYear, season: $season, status: $status, genre_in: $genres, sort: $sort, isAdult: $isAdult, countryOfOrigin: $countryOfOrigin, tag_in: $tags) {
      id
      averageScore
    }
  }
}
`;
   

const sortOptions = {
   sort: ["TRENDING_DESC", "POPULARITY_DESC"],
   seasonYear: getFullYear(),
   perPage: 20
}

const recentOptions = {
  sort: ['END_DATE_DESC'],
  status: 'FINISHED',
  perPage: 20
}


const topRatedOptions = {
  sort: ['POPULARITY_DESC'],
  perPage: 20

}

export async function getTopRated(){

    try{
       
        await delay(6000)

        const res = await fetch(`https://graphql.anilist.co`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: recentQuery,
            variables: topRatedOptions
        })
    })

    const attempt = await res.json()
    return attempt?.data?.Page?.media

    }catch(err){
        console.log("There was an error:", err)
        return err
    }

}

export async function getTrending(){

    try{
       
        await delay(6000)

        const res = await fetch(`https://graphql.anilist.co`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: trendingQuery,
            variables: sortOptions
        })
    })

    const attempt = await res.json()
    
    return attempt?.data?.Page?.media

    }catch(err){
        console.log("There was an error:", err)
        return err
    }

}

export async function getRecent(){

    try{
       
        await delay(6000)

        const res = await fetch(`https://graphql.anilist.co`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: recentQuery,
            variables: recentOptions
        })
    })

    const attempt = await res.json() 
    return attempt?.data?.Page?.media

    }catch(err){
        console.log("There was an error:", err)
        return err
    }

}







export async function getAnime(page){
  
  

    try{
       
        await delay(9400)

        const res = await fetch(`https://graphql.anilist.co`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: {
                page: page,
                perPage: 20
            }
        })
    })

    const attempt = await res.json()
    
    return attempt?.data?.Page?.media

    }catch(err){
        console.log("There was an error:", err)
        return err
    }

}

//getRecent()

//getTopRated()

//getTrending()

//getAnime(2)