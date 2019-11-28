import express = require('express')


const app = express()
const port: string = process.env.PORT || '3000'

app.get('/', (req:any,res:any) =>{
    res.render("hello.ejs")
    
})

app.listen(port, (err: Error) => {
    if (err)  {
        throw err
    }
    console.log(`server is listening on port ${port}`)
})