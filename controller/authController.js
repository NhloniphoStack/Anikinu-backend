import { db } from "../db/db.js"
import bcrypt from "bcryptjs"


export async function login(req, res){
    
   
    let {username, password} = req?.body || {}

    if(!username || !password){
        return res.status(400).json({error: 'All fields are requried'})
    }

    

    const dbData = await db.query(`
        SELECT * FROM users
        WHERE username = $1
        `, [username])

        

    const userExist = dbData?.rows

    if(userExist.length === 0){
        return res.status(400).json({error: 'Invalid user!'})
    }

    const dbAttempt = await db.query(`
        SELECT password FROM users 
        WHERE username = $1 
        `, [username])

        

    const dbpassword = dbAttempt?.rows[0]?.password
    

    
   const compare = await bcrypt.compare(password, dbpassword)

  

   if(!compare){
    return res.status(400).json({error: 'Password does not match'})
   }

   const dbUser = await db.query(`
        SELECT id from users
         WHERE username = $1
         `, [username])


    const role = await db.query(`
        SELECT role from users
         WHERE username = $1`, [username])

   req.session.userID =  dbUser?.rows[0]?.id
   
  
    return res.json({message: 'Login successful!', role: role?.rows[0]?.role})
}


export async function logout(req, res){

    
    req.session.destroy((err) => {
        if(err){
        return res.status(400).json({error: "Failed to Logout"})
    }
        res.clearCookie('connect.sid')

    return res.json({message: "Logout successful"})

    })
}