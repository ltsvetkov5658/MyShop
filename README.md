# Roll N Draw

**Roll N Draw** is a full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to browse a collection of products, view detailed information, place orders, and write reviews for each product. An admin panel is also available for managing products and viewing orders.

## Features

- Browse products with images, descriptions, and prices.
- Place orders with customer details (name and address).
- Leave reviews on products with user comments.
- Admin panel:
  - View all orders with customer details and order dates.
  - Add new products with detailed information.
  - Edit or delete existing products.
  - Track the number of purchases for each product.

## Technologies Used

- **Node.js** and **Express** – server-side logic and routing.
- **MongoDB** and **Mongoose** – database management and modeling.
- **EJS** – templating engine for dynamic views.
- **HTML** and **CSS** – frontend structure and styling.
- **MVC Architecture** – project organization and separation of concerns.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/roll-n-draw.git
   cd roll-n-draw
Install dependencies:

bash
Копиране
Редактиране
npm install
Start the application:

bash
Копиране
Редактиране
node server.js
Open your browser and navigate to:

arduino
Копиране
Редактиране
http://localhost:3000
Notes
Ensure you have MongoDB installed and running locally (default: mongodb://127.0.0.1:27017/rollndraw).

Modify the connection string in server.js if necessary.

Admin routes are accessible at:

/admin/products – Manage products

/admin/orders – View orders

/admin/products/new – Add a new product

License
This project is open-source and free to use for educational purposes.

