import { Router } from "express";
import CartManager from "../modules/cartManager.js";

const cartRouter = Router();
const carts = new CartManager();

// pedidos de producto
cartRouter.get ("/", async (req, res)=> {
    res.send (await carts.getCart());
})
// buscar prod por ID
cartRouter.get ("/:id", async (req, res)=> {
    let id = req.params.id;
    res.send (await carts.getCartById(id));
})

// Mandamos producto nuevo
cartRouter.post("/:cid/product/:pid", async (req, res)=> {
    let cartId = req.params.cid;
    let prodId = req.params.pid;
    res.send (await carts.addProductsCarts(cartId, prodId));
})



// cartRouter.put ("/:id", async (req, res)=> {
//     let id = req.params.id;
//     let updateProd = req.body;
//     res.send (await product.updateProds(id, updateProd));
// })

// cartRouter.delete ("/:id", async (req, res)=> {
//     let id = req.params.id;
//     res.send (await product.deleteProd(id));
// })


export default cartRouter