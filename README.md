# Recipe AI App

This guide provides step-by-step instructions on how to clone, set up, and run the Recipe AI App on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js & npm** (for the frontend) - [Download Node.js](https://nodejs.org/)
-   **Python 3.8+** (for the backend) - [Download Python](https://www.python.org/downloads/)
-   **MongoDB** (database) - [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)

---

## 1. Cloning the Repository

Open your terminal or command prompt and run the following command to clone the repository:

```bash
git clone https://github.com/jain-bhavna/recipe-ai-app.git
cd recipe-ai-app
```



---

## 2. Backend Setup

The backend is built with **FastAPI** and uses **MongoDB**.

### Step 2.1: Navigate to the backend directory

```bash
cd backend
```

### Step 2.2: Create a Virtual Environment

It allows you to manage dependencies separately for this project.

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

*(You should see `(venv)` appear at the start of your terminal line)*

### Step 2.3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2.4: Ensure MongoDB is Running

Make sure your local MongoDB server is running. The application expects MongoDB to be available at `mongodb://localhost:27017`.

If you haven't started it yet, you can typically start it as a service or by running `mongod` in a separate terminal window.
Do it in windows command prompt for smooth functioning. 

### Step 2.5: Run the Backend Server

```bash
uvicorn main:app --reload
```

The backend API will be available at: `http://localhost:8000`
API Documentation (Swagger UI): `http://localhost:8000/docs`

---

## 3. Frontend Setup

The frontend is built with **React** and **Tailwind CSS**.

### Step 3.1: Navigate to the frontend directory

Open a **new** terminal window (keep the backend running in the previous one) and go to the project root, then:

```bash
cd frontend
```

### Step 3.2: Install Dependencies

```bash
npm install
```

### Step 3.3: Run the Frontend Application

```bash
npm start
```

The application will start and automatically open in your browser at `http://localhost:3000`.

---

## Summary of Running the App

1.  **Terminal 1 (Backend):**
    ```bash
    cd backend
    venv\Scripts\activate  # Windows
    # source venv/bin/activate # Mac/Linux
    uvicorn main:app --reload
    ```

2.  **Terminal 2 (Frontend):**
    ```bash
    cd frontend
    npm start
    ```
