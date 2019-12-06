const express = require("express");
const Router = express.Router();

Router.get("/", (req: any, res: any) => {
    res
        .type("html")
        .status(200)
        
});

Router.get("/hello", (req: any, res: any) => {
    if (req.query.name) {
        res.render("hello.ejs", {
            name:
                req.query.name === "Ruben"
                    ? "Ruben"
                    : req.query.name
        });
    } else {
        res
            .type("html")
            .status(404)
            
    }
});
export default Router