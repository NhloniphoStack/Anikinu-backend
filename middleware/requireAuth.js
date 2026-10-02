

export function requireAuth(req, res, next){
    if(!req?.session?.userID){
        return res.status(400).json({error: 'Unauthorized user!'})
    }

    next()
}