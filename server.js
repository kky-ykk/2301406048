const express = require("express");
require("dotenv").config();
const axios=require('axios');
const { v4: uuidv4 } = require('uuid');

const app=express();

app.use(express.json());                             
const TEST_SERVER_URL = 'http://20.244.56.144/test/companies';


app.get('/', function (req, res) {
    res.send('server home page');
});

const fetchProducts = async (company, category, top, minPrice=0, maxPrice=Infinity) => {
    try {
        const response = await axios.get(`${TEST_SERVER_URL}/${company}/categories/${category}/products`, {
            params: { top, minPrice, maxPrice },
            headers: { Authorization: `Bearer ${process.env.TOKEN}` }
          });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
      return [];
    }
  };
  

  
  const fetchProductsForAllCompanies = async (category, top, minPrice=0, maxPrice=Infinity) => {
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const allProducts = [];
    for (const company of companies) {
      const products = await fetchProducts(company, category, top, minPrice, maxPrice);
      products.forEach(product => {
        product.id = uuidv4();
        product.company = company;
      });
      allProducts.push(...products);
    }
    return allProducts;
  };
  
  // Endpoint to get top N products within a category
  app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, minPrice = 0, maxPrice = Infinity, page = 1, sortBy, sortOrder = 'asc' } = req.query;
  
    let products = await fetchProductsForAllCompanies(categoryname, top, minPrice, maxPrice);
  
    // Sorting
    if (sortBy) {
      products.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }
  
    // Pagination
    const pageSize = parseInt(top, 10);
    const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);
  
    res.status(200).json(paginatedProducts);
  });


  app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    const products = await fetchProductsForAllCompanies(categoryname, 100); // Assuming a large number to get all products
    const product = products.find(p => p.id === productid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });


const PORT=process.env.PORT;
console.log(PORT);
app.listen(PORT,()=>{
    console.log("server is listending on port :",PORT);
});
  