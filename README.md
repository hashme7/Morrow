# **Morrow - Project Management Application**

Morrow is a robust, microservices-based project management application designed for efficient collaboration and team management. Built using the **MERN stack**, Morrow integrates cutting-edge technologies like **RabbitMQ**, **gRPC**, **TypeScript**, and a clean architecture approach to deliver a scalable, high-performance solution.

---

## **Features**

### 1. **Authentication & Authorization**
- **JWT-based Authentication** (with `morrow-common` npm package)
- Google OAuth integration
- Role-based access control (Project Manager & Developer)
- OTP verification during signup

### 2. **Project & Task Management**
- CRUD operations for projects and tasks
- Kanban board with real-time drag-and-drop updates
- Team creation and management
- Deadline tracking with planned vs. actual timelines

### 3. **Communication & Collaboration**
- Chat and video meetings
- Developer profiles for team collaboration
- Freelancer hiring module

### 4. **Enhanced Workflow**
- API testing module for team developers
- Interactive DB diagrams
- Skills suggestions powered by third-party APIs (e.g., Skillspop)

### 5. **Dashboards**
- Visual analytics for project progress and task completion
- Real-time notifications for updates

---

## **Tech Stack**

### **Frontend**
- **React** with **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **GSAP** for animations

### **Backend**
- **Node.js** with TypeScript
- **Express.js** for service-level APIs
- **MongoDB** for the database
- **RabbitMQ** for inter-service communication
- **gRPC** for efficient service-to-service communication
- **bcrypt.js** for secure password hashing

### **Microservices Architecture**
- **User Service**: Manages user data, authentication, and role-based access.
- **Project Service**: Handles project and task-related operations.
- **API Gateway**: Centralized entry point for routing and authentication.
- **Common Utilities**: Shared `morrow-common` npm package for JWT services and reusable code.

---

## **Installation & Setup**

### Prerequisites
- **Node.js** (v16+)
- **MongoDB**
- **RabbitMQ**

### Clone the Repository
```bash
git clone https://github.com/your-username/morrow.git
cd morrow
