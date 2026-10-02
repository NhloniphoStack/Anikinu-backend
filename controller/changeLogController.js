import { db } from "../db/db.js";

export async function getChangeLogs(req, res){

    const dbLogs = await db.query(`
        SELECT * FROM changelog
        `)

    


    return res.json(dbLogs?.rows)

}

export async function addLog(req, res){
      let {title, version, content} = req.body || {}

      if(!title || !version || !content){
        return res.status(400).json({error: 'All fields are requred'})
      }
     try{

        await db.query(`
        INSERT INTO changelog 
        (title, version, content) 
        VALUES ($1, $2, $3)
        `, [title, version, content])

        console.log("changelogs inserted")

        return res.json({message: 'Change Log Submitted!'})

     }catch(error){
        console.log("Inserting failed:", error)
        return res.status(400).json({error: error})
     }
      


    
}


export async function editLog(req, res){
    
    let { id } = req?.params

    let {title, version, content} = req?.body 

    id = parseInt(id)
  
    if(Number.isNaN(id)){
        return res.status(400).json({error: 'Invalid request'})
    }

    try{

        await db.query(`UPDATE changelog SET title = $1, version = $2, content = $3 WHERE id = $4`, [title, version, content, id])

           return res.json({message: 'Log has been edited successfully!'})

    }catch(error){
        return res.status(400).json({error: 'Editing Failed'})
    }


    

    



}


export async function getLog(req, res){
       let { id } = req?.params

        id = parseInt(id)

        if(Number.isNaN(id)){
               return res.status(400).json({message: "Invalid id input"})
        }
       
       
           
        const logData = await db.query('SELECT * FROM changelog WHERE id = $1', [id])
        const log = logData?.rows[0]
       
        return res.json(log)
}

export async function deleteLog(req, res){
    let { id } = req?.params

    
    id = Number(id)
    

    if(Number.isNaN(id)){
        return res.status(400).json({error: "Invalid id input"})
    }


    
    const existing = await db.query('SELECT * FROM changelog WHERE id = $1', [id])

   const dbLog = existing?.rows[0]

    if(!dbLog){
        return res.json({error: "Theres no such log!, log may already be deleted"})
    }

     
     await db.query(`DELETE FROM changelog WHERE id = $1`, [id])

     return res.json({message: "Log deleted!"})

    
   
}