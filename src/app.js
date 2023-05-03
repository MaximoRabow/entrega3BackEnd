import express from "express";
import ProductManager from "./modules/productManager.js";

const product = new ProductManager ();

const app = express();

app.use (express.json());
app.use (express.urlencoded ({ extended: true }));

// pedidos de producto
app.get ("/products", async (req, res)=> {
    res.send (await product.getProd());
})
// buscar prod por ID
app.get ("/products/:id", async (req, res)=> {
    let id = req.params.id;
    res.send (await product.getProdById(id));
})

// Mandamos producto nuevo
app.post("/products", async (req, res)=> {
    let newProd = req.body;
    res.send (await product.addProducts(newProd));
})

app.put ("/products/:id", async (req, res)=> {
    let id = req.params.id;
    let updateProd = req.body;
    res.send (await product.updateProds(id, updateProd));

})

app.delete ("/products/:id", async (req, res)=> {
    let id = req.params.id;
    res.send (await product.deleteProd(id));
})


app.listen (8080, ()=> {
    console.log('estamos leyendo puerto 8080');
})