import { db } from '../db/db.js'


async function createTable(){

    try{

        await db.query(`CREATE TABLE IF NOT EXISTS anime (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        anilist_id INTEGER NOT NULL UNIQUE,
        title_romaji TEXT,
        title_english TEXT,
        title_native TEXT,
        description TEXT,
        format TEXT,
        genres TEXT[],
        tags TEXT[],
        country_of_origin TEXT,
        status TEXT,
        isAdult TEXT,
        source TEXT,
        recommendations TEXT,
        synonyms TEXT,
        site_url TEXT,
        relations TEXT,
        start_date DATE,
        end_date DATE,
        episodes INTEGER,
        season TEXT,
        season_year INTEGER,
        average_score INTEGER,
        rankings TEXT[],
        popularity INTEGER,
        cover_image TEXT,
        banner_image TEXT,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`)

        await db.query(`CREATE TABLE IF NOT EXISTS trending (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            anilist_id INTEGER NOT NULL UNIQUE,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`)

        await db.query(`CREATE TABLE IF NOT EXISTS recently_Finished (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            anilist_id INTEGER NOT NULL UNIQUE,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`)

        await db.query(`CREATE TABLE IF NOT EXISTS top_rated (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            anilist_id INTEGER NOT NULL UNIQUE,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`)

            await db.query(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                created_at TIMESTAMPTZ
                )`)

            await db.query(`CREATE TABLE IF NOT EXISTS changelog (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                title TEXT NOT NULL,
                version TEXT,
                content TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )`)

              await db.query(`CREATE TABLE IF NOT EXISTS users_anime (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                anime_id INTEGER NOT NULL REFERENCES anime(id) ON DELETE CASCADE,
                status TEXT NOT NULL DEFAULT 'PLANNING',
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, anime_id)
                )`) 
                
                
        await db.query(`
            ALTER TABLE users 
            ALTER COLUMN profile_images 
            SET DEFAULT 'https://res.cloudinary.com/wgnrg4v3/image/upload/v1791136716/animedefault.jpg'
            `)

        console.log(" tables has been created!")

    }catch(err){
        console.log("There was a error:", err)
    }
    

    
}


createTable()