
# ITMD 504 Final Assessment - 2025 Spring B

This project is part of the final assessment for ITMD 504 in the **Master of Information Technology** program at **Illinois Institute of Technology**, Spring B.

## Git Repository  
You can find the repository here( <a href="https://github.com/eva-seulki/syoo11-first-app" target="_blank">https://github.com/eva-seulki/syoo11-first-app</a> ). Please refer to the README for more details.

## Live Demo  
  
Hosted on Azure:  
<a href="http://syoo11-first-app.azurewebsites.net" target="_blank">http://syoo11-first-app.azurewebsites.net</a>  
  
  
## API Documentation  
  
Swagger UI is available at:  
<a href="http://syoo11-first-app.azurewebsites.net/api-docs" target="_blank">http://syoo11-first-app.azurewebsites.net/api-docs</a>   

  
## Tasks & User Stories

Azure Devops:
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/6941b448-b769-4e50-9351-60ce94746c47" />  

## Deployment Pipeline  
1. Overview
> The project uses a CI/CD pipeline for automated deployment via GitHub Actions. On every push to the main branch, the application is built and deployed to Azure Web App.

2. Pipeline Flow (Diagram or Bullet Format)
```bash
  1. Pushes code to GitHub (`main` branch)
  2. GitHub Actions triggers workflow:
     - Install dependencies
     - Run tests
     - Build frontend with Vite
  3. Deploy to Azure Web App using publish profile
```
 *GitHub → GitHub Actions → Build & Test → Azure Web App*
<img width="800" alt="Image" src="https://github.com/user-attachments/assets/dbab9b2b-2049-4a58-bbfa-62f142bd59a7" />

3. Key Technologies / Tools  
> * GitHub Actions (.github/workflows/main_syoo11-first-app.yml)
> * Node.js / Vite
> * Azure Web App (Linux instance)  

4. Build Script Snippet
   
**`/frontend/package.json`**    
```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
```
 
**`/package.json`**  
```json
  "scripts": {
    "test": "jest",
    "build": "cd frontend && npm install && npm run build",
    "serve": "node app.js && node server.js",
    "start": "npm run build && npm run serve"
  }
```
 
5. Workflow Snippet
   
**`.github/workflows/main_syoo11-first-app.yml`**  
```yml
name: Build and deploy Node.js app to Azure Web App - syoo11-first-app

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22.x'
      - run: npm install
      - run: npm test 
      
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read #This is required for actions/checkout

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: '22.x'

      - name: Zip artifact for deployment
        run: zip release.zip ./* -r

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Production'
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}
    
    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: Unzip artifact for deployment
        run: unzip release.zip
      
      - name: 'Deploy to Azure Web App'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'syoo11-first-app'
          slot-name: 'Production'
          package: .
          publish-profile: ${{ secrets.XXXXX }}
```  

## Project Structure  
<pre><code>
syoo11-first-app/
├── app.js                  # Sets up the Express application and middleware
├── server.js               # Starts the Express server
├── backend/                # API route handlers and business logic
│   └── index.js            # Defines backend API routes
├── config/                 # Configuration files (e.g., DB, Swagger)
│   ├── datasource.js       # Database connection settings
│   └── swagger.js          # OpenAPI (Swagger) documentation setup
├── frontend/               # Frontend application (Vue.js + Vite)
│   └── src/
│       ├── App.vue         # Root Vue component
│       ├── router/         # Vue Router configuration
│       │   └── index.js    # Route definitions
│       └── views/          # Page-level Vue components (e.g., Dashboard, Tables)
├── tests/                  # API endpoint tests
│   └── test.js             # Uses Jest and Supertest for testing
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
</code></pre>  

## Database Configuration  
**`/config/datasource.js`**  
``` bash
const pool = mysql.createPool ({
    host: 'syoo11-mysql.mysql.database.azure.com',  
    user: 'XXXXX', 
    password: 'XXXXX',  
    database: 'XXXXX',  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
```   
## Technologies and Tools
  
- [x] CI/CD with GitHub Actions for automatic deployment to Azure
- [x] Backend Server: Node.js + Express
- [x] Frontend Server: Vue.js
- [x] Vite: Proxy API requests to the backend server
- [x] CORS enabled for frontend-backend integration
- [x] Open API: Swagger UI (`/api-docs`)
- [x] UI framework: Vuetify-based UI with Material Design
- [x] Database integration: Azure Database for MySQL flexible server
- [x] Other Tools: Azure Database for MySQL flexible server

## Run the Application

To get started with this project, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/eva-seulki/syoo11-first-app.git
   ```  

2. Run from the project root:
   ```bash
   npm start
   ```

## Screenshots  
1. Database
*Database Schema*
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/b715a0e6-6626-4a3a-a9d9-8f0ac4a8836e" />
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/eb75ecf0-3a0c-4b76-b9ca-d1e16df35916" />  

*Database Snapshot*
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/39ea1e33-45a5-496e-917f-9665de2398b6" />
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/a89b31a5-8df4-4b07-8589-8a44a60a59f1" />  

2. Routes Overview
*`/dashboard`*
- **Description:**
  Displays a line chart that visualizes data stored in the database.
- **Features:**
  Reflects real-time or recent updates from the database.
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/004cc322-b4ad-4f07-9138-25db5bfb7017" />  

*`/tables`*  
- **Description:**
  Shows a list of records retrieved from the database with inline editing capability.    
- **Features:**
  - Displays a table of database entries.
  - Each row has an **Edit** button.
  - Once edited, changes are immediately saved to the database without page refresh.
  - Provides a smooth and efficient user experience for managing data.  
<img width="1710" alt="Image" src="https://github.com/user-attachments/assets/a405d012-c1a9-4152-907f-a0e90000d3e8" />



