# 🛠️ **SkillUp Tracker Backend** 🛠️  

🚀 **SkillUp Tracker Backend** is the server-side component of the SkillUp Tracker application. It handles **user authentication**, **API endpoints**, and **database management** to enable seamless functionality for the frontend.

---

## 🌍 **Live API**
Access the deployed backend:  
**Base URL**: [SkillUp Tracker Backend](https://skillup-tracker-backend.onrender.com)  

---

## ✨ **Features**
- 🔒 **Secure Authentication**: JWT-based authentication for user login and sign-up.  
- 🌐 **RESTful APIs**: Expose APIs for handling users and learning goals.  
- 📦 **MongoDB Integration**: Persistent database to store user and skill data.  
- 📜 **Validation**: Input validation using middleware for robust API endpoints.  

---

## 🛠️ **Technologies Used**
- 🟢 **Node.js**: Backend runtime.  
- ⚡ **Express.js**: Lightweight and fast web framework.  
- 🛢️ **MongoDB**: NoSQL database for storing data.  
- 🔐 **JWT**: For authentication and session management.  
- 🔄 **CORS**: Cross-Origin Resource Sharing to support frontend-backend communication.  

---

## ⚙️ **API Endpoints**
### **User Authentication**
| Method | Endpoint           | Description                 |  
|--------|--------------------|-----------------------------|  
| POST   | `/signup`          | Register a new user.        |  
| POST   | `/login`           | Authenticate a user.        |  

### **Skill Management**
| Method | Endpoint           | Description                 |  
|--------|--------------------|-----------------------------|  
| GET    | `/skills`          | Fetch all skills.           |  
| POST   | `/skills`          | Add a new skill.            |  
| PUT    | `/skills/:id`      | Update a skill by ID.       |  
| DELETE | `/skills/:id`      | Delete a skill by ID.       |  

---

## ⚙️ **Installation and Setup**
Follow these steps to run the backend locally:  

### **1. Clone the Repository**
```bash
git clone https://github.com/jyoti-131/skillup-tracker-backend.git
cd skillup-tracker-backend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Variables**  
Create a `.env` file in the root directory with the following content:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

Replace `your_mongodb_connection_string` with your **MongoDB Atlas URI** and `your_jwt_secret` with a strong secret key.  

### **4. Start the Server**
```bash
npm start
```
The server will run on `http://localhost:5001`.  

---

## 🌍 **Deployment**
This backend is deployed on **Render**.  

**Deployed URL**: [SkillUp Tracker Backend](https://skillup-tracker-backend.onrender.com)  

---

## 📋 **Example API Usage**
Use the following example with any HTTP client (e.g., Postman or Axios).  

### **Login Example**
**Endpoint**: `/login`  
**Method**: `POST`  
**Request Body**:  
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```  
**Response**:  
```json
{
  "message": "Login successful!",
  "token": "your_jwt_token"
}
```  

---

## 👩‍💻 **Contributing**
Contributions are welcome! To contribute:  
1. Fork the repository.  
2. Create a new branch (`feature/new-feature`).  
3. Commit your changes.  
4. Submit a pull request. 💡  

---

## 📬 **Contact**
For queries or suggestions:  
📧 **Email**: [jyoti's Email](mailto:jyotisinhap7@gmail.com)  
🔗 **GitHub**: [Jyoti's GitHub](https://github.com/jyoti-131)  

---

Give this repository a ⭐ if you found it useful! 😊  
