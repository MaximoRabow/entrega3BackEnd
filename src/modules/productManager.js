import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

// agregar productos al json
class ProductManager {
    constructor() {
        this.path = "./src/product.json";
    }

    // lee productos
    readprod = async()=> {
        let products = await fs.readFile (this.path, "utf-8");
        return JSON.parse (products);
    }

    writeProd = async(product)=> {
        await fs.writeFile (this.path, JSON.stringify(product));
    }


    // escribe producto nuevo
    addProducts = async(product) => {
        let productsOld = await this.readprod();
        product.id = nanoid();
        let totalProduct = [...productsOld, product];
        await this.writeProd (totalProduct);
        return "el producto se agrego correctamente";
    };

    // lista productos
    getProd = async () => {
        return await this.readprod();
    }

    getProdById = async (id) => {
        let products = await this.readprod();
        let productById = products.find (prods => prods.id === id);
        if (!productById) {
            return ('producto no encontrado');
        }
        return productById;
    }

    deleteProd = async (id) => {
        let products = await this.readprod();
        let prodexiste = products.some (prods => prods.id === id);
        if (prodexiste) {
            let filtrarprod = products.filter (prods => prods.id !== id)
        }
    }
}

export default ProductManager;

