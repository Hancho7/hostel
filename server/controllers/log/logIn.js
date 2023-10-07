import Users from "../../models/user.js"

export const logIn = async (req, res)=>{
    const {email, password}= req.body

    try{
        const user = await Users.findOne({email:email})
        if(user){
            const isMatch = await user.comparePassword(password)
            if(isMatch){
                res.json(user)
            } 
            else{
                res.json("NoMatch")
            }            
        }
        else{
            res.json("NoMatch")
        }
       
    }
    catch(e){
        console.log(e)
    }
}

