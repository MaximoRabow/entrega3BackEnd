import express from "express";
import prodRouter from "./routers/product.routes.js";
import cartRouter from "./routers/cart.routes.js";

const app = express();

app.use (express.json());
app.use (express.urlencoded ({ extended: true }));
app.use ("/api/products", prodRouter)
app.use ("/api/carts", cartRouter)


app.listen (8080, ()=> {
    console.log('estamos leyendo puerto 8080');
})