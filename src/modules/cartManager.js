import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './productManager.js';

const totalProd = new ProductManager();

class CartManager {
    constructor() {
        this.path = "./src/cart.json";
    }

     // lee productos
     readCart = async()=> {
        let carts = await fs.readFile (this.path, "utf-8");
        return JSON.parse (carts);
    }

    writeCart = async(cart)=> {
        await fs.writeFile (this.path, JSON.stringify(cart));
    }

    addCarts = async () => {
        let cartsOld = await this.readCart();
        let id = nanoid();
        let totalCarts = [{id : id, products : []}, ...cartsOld];
        await this.writeCart(totalCarts);
        return 'nuevo carrito'
    }
    
    getCart = async () => {
        return await this.readCart();
    }

    cartExist = async (id) => {
        let carts = await this.readCart();
        return carts.find (cart => cart.id === id);
    }

    getCartById = async (id) => {
        let cartById = await this.cartExist(id);
        if (!cartById) {
            return 'Carrito no encontrado';
        }
        return cartById;
    }

    addProductsCarts = async (cartId, prodId) => {
        let cartById = await this.cartExist(cartId)
        if (!cartById) {
            return "Carrito no existe"
        }
        let prodById = await totalProd.prodexist(prodId);
        if (!cartById) {
            return "Producto no existe"
        }
        let totalCarts = await this.readCart();
        let cartFilter = totalCarts.filter ((cart) => cart.id !== cartId)


        if (cartById.products.some ((prod) => prod.id === prodId)) {
            let prodInCart = cartById.products.find ((prod) => prod.id === prodId);
            prodInCart.cantidad + 1
            let cartAll = [prodInCart, ...cartFilter];
            await this.writeCart (cartAll)
            return 'Producto en carrito'
        }
        
        let cartsAll = [{id: cartId, products : [{id: prodById.id, cantidad: 1}]}, ...cartFilter];
        await this.writeCart(cartsAll);
        return 'Producto en carrito'
    }

}

export default CartManager