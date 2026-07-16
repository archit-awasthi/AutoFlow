# 🚀 AutoFlow

> A Visual Browser Automation Platform built with React, Node.js, MongoDB and Playwright.

AutoFlow allows users to visually create browser automation workflows using a drag-and-drop interface and execute them in a real Chromium browser powered by Playwright.

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 📂 Personal Workflow Dashboard
- ➕ Create & Delete Workflows
- 🎨 Visual Workflow Builder (React Flow)
- 💾 Save & Load Workflows
- ⚙️ Configurable Automation Nodes
- ▶️ Execute Workflows using Playwright
- 🌐 Browser Automation
- 📦 MongoDB Database Integration
- ☁️ Deployment Ready

---

# 📸 Preview

> Add screenshots here after deployment.

### Dashboard

<img src="screenshots/dashboard.png" width="100%">

---

### Workflow Builder

<img src="screenshots/builder.png" width="100%">

---

### Browser Automation

<img src="screenshots/playwright.png" width="100%">

---

# 🏗 Architecture

```

```
React (Vite)
      │
      ▼
Express.js API
      │
      ▼
MongoDB Atlas
      │
      ▼
Playwright Automation Engine
      │
      ▼
Chromium Browser
```

```md

---

# ⚙️ Tech Stack

## Frontend

- React
- Vite
- React Flow
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Playwright

## Database

- MongoDB Atlas

## Deployment

- Vercel
- Render

---

# 📁 Project Structure

```

```
AutoFlow
│
├── client
│   ├── src
│   ├── pages
│   ├── services
│   ├── context
│   └── components
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── config
│
└── README.md
```

```md

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/archit-awasthi/AutoFlow.git
```

```bash
cd AutoFlow
```

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```
---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Workflows

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/workflows` | Create Workflow |
| GET | `/api/workflows` | Get User Workflows |
| GET | `/api/workflows/:id` | Get Single Workflow |
| PUT | `/api/workflows/:id/flow` | Save Workflow |
| DELETE | `/api/workflows/:id` | Delete Workflow |
| POST | `/api/workflows/:id/run` | Execute Workflow |

---

# ⚡ Example Workflow

## Open Google

```
Start
   │
Open URL
https://google.com
   │
Type
Selector: textarea

Text: ChatGPT
   │
Click
Selector: textarea
```

Execution:

```
Launch Chromium
↓

Open Google

↓

Type "ChatGPT"

↓

Perform Search

↓

Close Browser
```

---

# 💡 Key Features

- Secure JWT Authentication
- User-specific workflow management
- Visual drag-and-drop workflow builder
- Persistent workflow storage
- Browser automation using Playwright
- Configurable automation nodes
- RESTful API architecture
- Modular backend design

---

# 📌 Future Enhancements

- 🤖 AI-powered workflow generation
- 📅 Scheduled workflow execution
- 📊 Workflow execution history
- 📸 Automatic screenshot capture
- 📄 Export & Import workflows
- 🌐 Multi-browser support
- ☁️ Docker deployment
- 📈 Workflow analytics dashboard

---

# 🧠 What I Learned

While building AutoFlow I gained practical experience with:

- Designing REST APIs
- JWT Authentication
- MongoDB Schema Design
- React State Management
- React Flow
- Playwright Browser Automation
- Node.js Backend Development
- Full Stack Application Architecture
- Deployment & Environment Variables

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Archit Awasthi**

GitHub:

https://github.com/archit-awasthi

LinkedIn:

(Add your LinkedIn URL)

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps the project reach more developers.

---

# 🚀 AutoFlow

**Build. Automate. Execute.**