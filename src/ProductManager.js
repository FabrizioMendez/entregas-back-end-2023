const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo de productos:', error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      return null;
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      product.id = this.generateProductId(products);
      products.push(product);
      await this.saveProducts(products);
      return product;
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      return null;
    }
  }

  async updateProduct(product) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = product;
        await this.saveProducts(products);
        return product;
      }
      return null;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await this.saveProducts(products);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return false;
    }
  }

  generateProductId(products) {
    const ids = products.map(product => product.id);
    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }
    return newId;
  }

  async saveProducts(products) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }
}

module.exports = ProductManager;
