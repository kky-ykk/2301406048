# Project Overview

This repository contains solutions to backend and frontend development questions as part of a technical assessment.

## Question 1: Backend Development

### Description
Implemented an HTTP Microservice using Node.js and Express to aggregate product data from multiple e-commerce APIs. The service provides endpoints to fetch top N products within specified categories and price ranges, supporting sorting and pagination. Each product is assigned a unique identifier using UUID generation. The goal was to ensure efficient API usage while delivering timely and accurate responses.

### Technologies Used
- Node.js
- Express
- Axios
- UUID

### Implemented APIs
- `/categories/:categoryname/products`: Retrieves top N products within a category.
- `/categories/:categoryname/products/:productid`: Fetches details of a specific product by ID.

## Question 2: Frontend Development

### Description
Developed a responsive React frontend application to display top N products fetched from the backend microservice. 
### Technologies Used
- React.js
- React Router
- Axios

### Implemented Pages
- Products Page: Displays a list of all products with basic details.
- Product Details Page: Shows detailed information about a selected product.
