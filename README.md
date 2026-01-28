SkillMint 
============

SkillMint is a **full‑stack web application** designed to connect users based on skills and projects. It allows users to register, authenticate, manage profiles, create projects, view matches, and collaborate efficiently.

Features
----------

### Authentication

*   User registration & login
    
*   JWT‑based authentication
    
*   Protected routes
    

### User Profile

*   View profile details
    
*   Edit profile (name, email, password)
    
*   Secure profile update using authentication middleware
    

### Projects

*   Create and manage projects
    
*   View full project details
    
*   See applicants for a project
    
*   Comment on projects
    

### Matching System

*   Skill‑based user matching
    
*   Fetch matched users/projects
    

Tech Stack
-------------

### Frontend

*   React (Vite)
    
*   React Router DOM
    
*   Axios
    
*   Tailwind CSS (UI styling)
    

### Backend

*   Node.js
    
*   Express.js
    
*   MongoDB with Mongoose
    
*   JWT (Authentication)
    
*   bcrypt (Password hashing)
    

Project Structure
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   SkillMint/  │  ├── backend/  │   ├── controllers/  │   ├── middleware/  │   ├── models/  │   ├── routes/  │   ├── app.js  │   └── server.js  │  ├── frontend/  │   ├── src/  │   │   ├── pages/  │   │   ├── components/  │   │   ├── services/api.js  │   │   ├── App.jsx  │   │   └── main.jsx  │   └── index.html  │  └── README.md   `

Environment Variables
------------------------

Create a .env file inside the **backend** folder:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   MONGO_URI=your_mongodb_connection_string  JWT_SECRET=your_jwt_secret  PORT=5100   `

Create a .env file inside the **frontend** folder:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   VITE_API_URL=http://localhost:5100/api   `

Running the Project
----------------------

### Start Backend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm install  npm run dev   `

Server will run on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:5100   `

### Start Frontend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install  npm run dev   `

Frontend will run on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:3000   `

API Routes Overview
----------------------

### Auth

*   POST /api/auth/register
    
*   POST /api/auth/login
    

### Users

*   GET /api/users/me
    
*   PUT /api/users/me
    

### Projects

*   GET /api/projects
    
*   POST /api/projects
    
*   GET /api/projects/:id
    

### Match

*   GET /api/match
