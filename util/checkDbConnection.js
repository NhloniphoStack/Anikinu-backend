import { db } from "../db/db.js";


export async function checkDbConnection(){
    try{
        await db.query('SELECT * FROM anime')
        return true
    }catch(err){
        return false
    }
}