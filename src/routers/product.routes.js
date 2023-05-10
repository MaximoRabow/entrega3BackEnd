import { Router } from "express";
import ProductManager from "../modules/productManager.js";

const prodRouter = Router();
const product = new ProductManager();

// pedidos de producto
prodRouter.get ("/", async (req, res)=> {
    res.send (await product.getProd());
})
// buscar prod por ID
prodRouter.get ("/:id", async (req, res)=> {
    let id = req.params.id;
    res.send (await product.getProdById(id));
})

// Mandamos producto nuevo
prodRouter.post("/", async (req, res)=> {
    let newProd = req.body;
    res.send (await product.addProducts(newProd));
})

prodRouter.put ("/:id", async (req, res)=> {
    let id = req.params.id;
    let updateProd = req.body;
    res.send (await product.updateProds(id, updateProd));
})

prodRouter.delete ("/:id", async (req, res)=> {
    let id = req.params.id;
    res.send (await product.deleteProd(id));
})


export default prodRouter