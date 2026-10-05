import { db } from "../db/db.js"
import bcrypt from "bcryptjs"
import validator from 'validator'


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


export async function signup(req, res){
    let {username, password, email} = req.body

    if(!username || !password || !email){
        return res.status(404).json({error: "All fields are required!"})
    }

    const checkEmail = validator.isEmail(email)

    

    if(!checkEmail){
        return res.status(400).json({error: 'Invalid email format'})
    }

    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)){
        return res.status(400).json({error: 'Invalid username format'})
    }

    password = await bcrypt.hash(password, 10)
    username = username.trim()
    email = email.trim()
    
    const existingData  = await db.query(`SELECT * FROM users WHERE username = $1`, [username])

    const existing = existingData?.rows[0]

    if(existing){
        return res.status(400).json({error: 'Account already exist for this user'})
    }

    
   

   const results = await db.query(`INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3) 
        RETURNING id
        `, [username, password, email])

     const userID = results?.rows[0]?.id
     

     req.session.userID = userID


   return res.json({message: "Signup successful!"})


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