# 📦 ITMD 504 Final Assessment - 2025 Spring B

This project is part of the final assessment for ITMD 504 in the **Master of Information Technology** program at **Illinois Institute of Technology**, Spring B.

## 🌍 Live Demo  
  
Hosted on Azure:  
🔗 <a href="https://www.google.com/](http://syoo11-first-app.azurewebsites.net" target="_blank">http://syoo11-first-app.azurewebsites.net</a>  
  
  
## 🌐 API Documentation  
  
Swagger UI is available at:  
➡️ <a href="https://www.google.com/](http://syoo11-first-app.azurewebsites.net/api-docs" target="_blank">http://syoo11-first-app.azurewebsites.net/api-docs</a>   

  
## ✒️ Task Management

Azure Devops:
<img width="1382" alt="Image" src="https://github.com/user-attachments/assets/6941b448-b769-4e50-9351-60ce94746c47" />  
  
## 📈 Database Table Snapshot  
<img width="1666" alt="Image" src="https://github.com/user-attachments/assets/7bea6fd3-fb38-4512-a059-19c9ffa1a6fe" />  

## 💻 Technologies Used

- **Frontend**: Vue.js
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Cloud/DevOps**: Azure
- **Other Tools**: GitHub Actions, Vite, Vuetify, Swagger  

## 🛠️ Project Structure  
<pre><code>
syoo11-first-app/
├── backend/                # Backend server (Node.js + Express)
│   └── index.js            # Backend API entry point with business logic
├── frontend/               # Frontend Vue.js application
│   └── src/                # Vue + Vite source code
│       ├── App.vue         # Root Vue component
│       ├── router/         # Vue Router configuration
│       │   └── index.js    # Route definitions
│       └── views/          # Page-level Vue components
├── config/                 # Configuration files
│   ├── datasource.js       # Database connection settings
│   └── swagger.js          # OpenAPI (Swagger) configuration
├── app.js                  # Express server entry (for serving frontend or SSR)
└── package.json            # Project dependencies and scripts
</code></pre>  

  
## ✅ Features  
  
- [x] CI/CD with GitHub Actions for automatic deployment to Azure
- [x] Backend Server: Node.js + Express
- [x] Frontend Server: Vue.js
- [x] Vite: Proxy API requests to the backend server
- [x] CORS enabled for frontend-backend integration
- [x] Open API: Swagger UI (`/api-docs`)
- [x] UI framework: Vuetify-based UI with Material Design
- [x] Database integration: Azure Database for MySQL flexible server

## 🏃 Installation

To get started with this project, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/eva-seulki/syoo11-first-app.git
   ```

2. Run from the project root:
   ```bash
   npm start
   ```
