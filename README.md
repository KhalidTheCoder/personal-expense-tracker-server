# ⚙️ Personal Expense Tracker – Backend (Node.js + Express + MongoDB)

This is the **backend server** for the Personal Expense Tracker app.  
It provides REST APIs for managing expenses and handles authentication with Firebase.

---

## 🔗 Live Demo

- **View Live**: [Live Site](https://expense-tracker-5bc64.web.app/)  


---

## 🚀 Features

- CRUD APIs for managing expenses  
- MongoDB Atlas for storing user data  
- Firebase JWT authentication (server-side verification)  
- Error handling & input validation  
- CORS-enabled for frontend communication  

---

## ⚙️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB Atlas**  
- **Firebase Admin SDK**  
- **dotenv** for environment config  

---

## 🖥️ Run Locally (Backend)

1️⃣ Clone repository  

```bash
git clone https://github.com/KhalidTheCoder/personal-expense-tracker-server
cd personal-expense-tracker-server

2️⃣ Install dependencies

```bash
npm install 

3️⃣ Create .env file in root:

```env
DB_USER=yourMongoUser
DB_PASS=yourMongoPassword
FB_SERVICE_KEY=yourFirebaseServiceKey

️⚠️Note: FB_SERVICE_KEY should be your Firebase Admin SDK JSON, encoded in Base64.


4️⃣ Run backend server

```bash
npm run dev

➡️ Backend will be running at: http://localhost:5000





