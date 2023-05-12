class ProductManager {
    constructor() {
      // Array para almacenar los productos
      this.products = []; 
      // Siguiente ID para asignar a los productos
      this.nextId = 1; 
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.log(`Ya existe un producto con el código ${code}.`);
        return;
      }
  
      // Asignar un ID autoincrementable al producto
      const product = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      this.nextId++;
      // Agregar el producto al conjunto
      this.products.push(product); 
    }
    // Devolver el arreglo con todos los productos
    getProducts() {
      return this.products; 
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        // Devolver el producto si se encuentra
        return product; 
      } else {
        // Mostrar error si no se encuentra el producto
        console.log("Not found"); 
        // Devolver null para indicar que el producto no se encontró
        return null; 
      }
    }

    deleteProduct(id) {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        console.log(`Producto con ID ${id} eliminado.`);
      } else {
        console.log("Not found"); // Mostrar error si no se encuentra el producto
      }
    }

  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  // Agregar productos al ProductManager
  productManager.addProduct("Product 1", "Description of Product 1", 10.99, "path/to/image1.jpg", "P001", 50);
  productManager.addProduct("Product 2", "Description of Product 2", 19.99, "path/to/image2.jpg", "P002", 25);
  productManager.addProduct("Product 3", "Description of Product 3", 5.99, "path/to/image3.jpg", "P003", 100);
  
  // Obtener un producto por su ID

  const product = productManager.getProductById(2);
  console.log(product);
  
  // Intentar obtener un producto inexistente por su ID

  const nonexistentProduct = productManager.getProductById(5);


  // Eliminar un producto por su ID
productManager.deleteProduct(2);

// Obtener todos los productos después de la eliminación
const remainingProducts = productManager.getProducts();
console.log(remainingProducts);
  
