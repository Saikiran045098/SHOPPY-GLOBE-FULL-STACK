# 🛍️ Shoppy Globe — Full Stack E-Commerce Application

**Shoppy Globe** is a full-stack MERN e-commerce web application that allows users to browse, register, log in, add products to the cart, and securely manage their shopping experience.  
Built using **MongoDB, Express.js, React.js, and Node.js**, the project follows the **MVC pattern** and includes **JWT-based authentication** for secure API access.

---

## 🚀 Features

### 👤 User Management
- Register and log in securely using JWT tokens  
- Passwords hashed with **bcrypt** for enhanced security  
- Persistent authentication across sessions  

### 🛒 Cart System
- Add, update, and remove products in cart  
- Protected routes using JWT middleware  
- User-specific cart data management  

### 🛍️ Product Management
- CRUD operations for products (Create, Read, Update, Delete)  
- Product details, image display, and category listings  

### 💻 Frontend (React)
- Built with **React + Vite**  
- State management using **Redux Toolkit**  
- Responsive and interactive UI with CSS animations  
- Integration with backend APIs for dynamic data  

### ⚙️ Backend (Node.js + Express)
- RESTful API architecture  
- MVC structure for scalability  
- Connected to MongoDB using **Mongoose**  
- JWT-protected endpoints  

---

## 🧩 Complete Folder Structure

```
E:\shoppy-globe\
│
├── .vscode\
│   └── settings.json
│
├── shoppy-globe\
│   ├── BACKEND\
│   │   ├── controllers\
│   │   │   ├── authcontroller.js
│   │   │   ├── cartcontroller.js
│   │   │   ├── Productcontroller.js
│   │   │   ├── Productsfetching.js
│   │   │   ├── UserLogincontroller.js
│   │   │   └── userRegistercontroller.js
│   │   │
│   │   ├── models\
│   │   │   ├── cartmodel.js
│   │   │   ├── Productmodel.js
│   │   │   ├── UserLoginmodel.js
│   │   │   └── userRegistermodel.js
│   │   │
│   │   ├── routes\
│   │   │   ├── cartroutes.js
│   │   │   ├── Productroutes.js
│   │   │   ├── UserLoginroutes.js
│   │   │   └── userRegisterroutes.js
│   │   │
│   │   ├── .env
│   │   ├── Apidata.js
│   │   ├── authmiddleware.js
│   │   ├── cartAPI.js
│   │   ├── server.js
│   │   └── UserApi.js
│   │
│   ├── node_modules\
│   │
│   ├── public\
│   │   ├── Online Shopping Concept.jpg
│   │   ├── shopping.jpg
│   │   ├── shopping2_generated.jpg
│   │   └── vite.svg
│   │
│   ├── src\
│   │   ├── assets\
│   │   │   └── react.svg
│   │   │
│   │   ├── cart\
│   │   │   ├── cart.css
│   │   │   ├── cart.jsx
│   │   │   ├── cartitem.css
│   │   │   └── cartitem.jsx
│   │   │
│   │   ├── checkout\
│   │   │   ├── checkoutpage.css
│   │   │   └── checkoutpage.jsx
│   │   │
│   │   ├── components\
│   │   │   ├── Header.css
│   │   │   ├── Header.jsx
│   │   │   ├── Homemsg.css
│   │   │   ├── Homemsg.jsx
│   │   │   ├── Notfound.css
│   │   │   ├── Notfound.jsx
│   │   │   ├── productdetail.jsx
│   │   │   ├── productdetails.css
│   │   │   ├── productitem.css
│   │   │   ├── productitem.jsx
│   │   │   ├── productlist.css
│   │   │   ├── productlist.jsx
│   │   │   └── useproducts.js
│   │   │
│   │   ├── footer\
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Redux\
│   │   │   ├── cartSlice.js
│   │   │   ├── productslice.js
│   │   │   └── store.js
│   │   │
│   │   ├── User\
│   │   │   ├── LoginForm.css
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegistratioForm.jsx
│   │   │   └── RegistrationForm.css
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── spinner.css
│   │   └── spinner.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
```

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Redux Toolkit
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors
- body-parser

---

## 🔒 Authentication

- JWT tokens generated during login  
- Tokens verified via middleware (`authmiddleware.js`)  
- Protected routes include `/api/cart`, `/api/user`, etc.  
- Example header:  
  ```
  Authorization: Bearer <your_token_here>
  ```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-github-username/shoppy-globe.git
cd shoppy-globe
```

### 2️⃣ Backend Setup
```bash
cd BACKEND
npm install
```

Create a `.env` file inside the `BACKEND` directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:
```bash
npm run dev
# or
node server.js
```

### 3️⃣ Frontend Setup
```bash
cd ..
npm install
npm run dev
```

The frontend will start on:
```
http://localhost:5173
```

Backend will run on:
```
http://localhost:5000
```

---

## 📡 Protected API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/products` | Add new product |
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:id` | Update cart item |
| DELETE | `/api/cart/:id` | Remove item from cart |

---

## 📷 Screenshots

_Add screenshots of your app’s pages here (Home, Login, Cart, Checkout, etc.)_

---

## 👨‍💻 Author

**Sidramaina Sai Kiran**  
🔗 GitHub: (https://github.com/Saikiran045098 )

---


