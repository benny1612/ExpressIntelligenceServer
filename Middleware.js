import { readData } from "./dataFunc.js"

export const userValdiet=async (req,res,next)=>{
    const {name ,password}= req.headers
    const getData = await readData("users")
    const dbName=getData.find((element) => element.name == name)
    const dbPassword=getData.find((element) => element.password == password)
    if (dbName && dbPassword){
        next()
    }
    else{res.status(401).send("not allwoad")}


}