# 🛒 E-Commerce Backend Design (MVP – Customer Only)

---

## 1. 🔄 User Flow

**Actors:**
- Customer (via web app)
- Backend API

**Flows:**
1. **Browse Products**
   - GET `/categories` → list categories
   - GET `/api/products` → list products (with categories)
   - GET `/api/products/:id` → product details

2. **Cart**
   - POST `/api/cart` → add product to cart
   - PUT `/api/cart/:itemId` → update qty
   - DELETE `/api/cart/:itemId` → remove item
   - GET `/api/cart` → view cart

3. **Orders**
   - POST `/api/orders` → place order (cart → order snapshot)
   - GET `/api/orders` → list user orders

4. **Profile**
   - POST `/api/user/profile` → add profile after signUp
   - GET `/api/user/profile` → view profile
   - PUT `/api/user/profile` → update profile

---

## 2. 🗂 Entities & Relationships

- **User**
  - Linked to Firebase UID
  - Has profile info
  - 1 cart
  - Many orders

- **Category**
  - Groups products

- **Product**
  - Belongs to category
  - Can appear in many carts/orders

- **Cart**
  - Belongs to one user
  - Contains many products

- **Order**
  - Belongs to one user
  - Snapshot of products (immutable)

---

## 3. 📦 Database Schemas (Mongoose)

### **User**
```js
const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // Firebase UID
  name: String,
  email: String,
  phone: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
}, { timestamps: true });
```

### **Category**
```js
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
}, { timestamps: true });
```

### **Products**
```js
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String], // array of image URLs
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: { type: Number, default: 0 },
}, { timestamps: true });
```

### **Cart**
```js
const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  }]
}, { timestamps: true });
```


### **Order**
```js
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // snapshot reference
    name: String,   // snapshot of product name
    price: Number,  // snapshot of product price
    quantity: Number,
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
}, { timestamps: true });
```

## 4. 🔗 Relationships

- `User` → has **1 cart** (referenced by `Cart.user`)
- `User` → has **many orders** (referenced by `Order.user`)
- `Category` → has **many products** (`Product.category`)
- `Product` → referenced in **Cart.items** and **Order.items**

---

## 5. 🛠 API Endpoints

| Resource   | Method | Endpoint                | Description                |
|------------|--------|-------------------------|----------------------------|
| User       | GET    | `/api/user/profile`     | Get logged-in user profile |
| User       | PUT    | `/api/user/profile`     | Update profile             |
| User       | POST   | `/api/user/profile`     | Add profile                |
| Categories | GET    | `/api/categories`       | List categories            |
| Products   | GET    | `/api/products`         | List products              |
| Products   | GET    | `/api/products/:id`     | Get product details        |
| Cart       | GET    | `/api/cart`             | View cart                  |
| Cart       | POST   | `/api/cart`             | Add item to cart           |
| Cart       | PUT    | `/api/cart/:itemId`     | Update qty in cart         |
| Cart       | DELETE | `/api/cart/:itemId`     | Remove from cart           |
| Orders     | POST   | `/api/orders`           | Place new order            |
| Orders     | GET    | `/api/orders`           | List user orders           |

---

## 6. ⚖️ Standards & Practices

- Use **Firebase auth middleware** on protected routes  
- Centralized error handling middleware  
- Input validation (`express-validator` or `zod`)    
- Logging (`morgan`)  
- Security middleware (`helmet`)  
- Env vars via `dotenv`  

---

## 7. 🚀 Build Plan (Checklist)

- [ ] Setup MongoDB connection  
- [ ] Define schemas (User, Category, Product, Cart, Order)  
- [ ] Setup Firebase auth middleware  
- [ ] Implement Category & Products API  
- [ ] Implement Cart API  
- [ ] Implement Orders API  
- [ ] Implement User Profile API  
- [ ] Add validation + error handling   
- [ ] Add logging + security middlewares  


# Mermaid ER Diagram

erDiagram
    USER {
        string _id
        string firebaseUid
        string name
        string email
        string phone
        object address
    }

    CATEGORY {
        string _id
        string name
        string description
    }

    PRODUCT {
        string _id
        string name
        string description
        number price
        string[] images
        ObjectId category
        number stock
    }

    CART {
        string _id
        ObjectId user
    }

    CARTITEM {
        string _id
        ObjectId cartId
        ObjectId productId
        number quantity
    }

    ORDER {
        string _id
        ObjectId user
        number totalAmount
        string status
        object address
        object payment
    }

    ORDERITEM {
        string _id
        ObjectId orderId
        ObjectId productId
        string name
        number price
        number quantity
    }

    %% Relationships
    USER ||--|| CART : "owns"
    USER ||--o{ ORDER : "places"
    CATEGORY ||--o{ PRODUCT : "categorizes"
    PRODUCT ||--o{ CARTITEM : "added in"
    PRODUCT ||--o{ ORDERITEM : "purchased in"
    CART ||--o{ CARTITEM : "contains"
    ORDER ||--o{ ORDERITEM : "contains"
