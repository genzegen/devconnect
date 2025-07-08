## DevConnect

DevConnect is a full-stack web application built using React for the frontend and Django for the backend.

This project is learning practice for myself to understand and improve my React and full-stack application knowledge.

### Features:
1. User Registration and Login
2. Responsive UI built with React
3. REST API backend with Django REST framework

## Getting Started
### Prerequisites
- Node.js and npm
- Python 3.x
- Virtualenv (recommended)

### Installation

1. Clone the repo:
    bash
    git clone https://github.com/genzegen/devconnect.git
    cd devconnect

2. Backend setup:
    bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
   
3. Frontend setup:
    bash
    cd ../frontend
    npm install
    npm run dev

## Usage
- Access the frontend at http://localhost:5173
- Backend API runs at http://127.0.0.1:8000/api/
