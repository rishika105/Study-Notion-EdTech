# StudyNotion

**AN ED-TECH PLATFORM**

StudyNotion is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

StudyNotion aims to provide:
- A seamless and interactive learning experience for students, making education more accessible and engaging.
- A platform for instructors to showcase their expertise and connect with learners across the globe.

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Front-end](#front-end)
3. [Back-end](#back-end)
5. [API Design](#api-design)
6. [Deployment](#deployment)
7. [Installation](#installation)
8. [Configuration](#configuration)
9. [Usage](#usage)
10. [Screenshots](#screenshots)
11. [Future Enhancements](#future-enhancements)

## System Architecture

The StudyNotion ed-tech platform consists of three main components: the front end, the back end, and the database. The platform follows a client-server architecture, with the front end serving as the client and the back end and database serving as the server.

### Architecture Diagram
![studynotion archii](https://github.com/rishika105/Study-Notion-EdTech/assets/165581871/0fffcb2f-f7b1-4a2a-bcc5-e536d1e62cd4)

## Front-end

The front end of the platform is built using ReactJS, which allows for the creation of dynamic and responsive user interfaces. The front end communicates with the back end using RESTful API calls.

### Front-end Pages
#### For Students:
- **Homepage:** Brief introduction to the platform, links to the course list and user details.
- **Course List:** List of all available courses, with descriptions and ratings.
- **Wishlist:** Displays courses added to the wishlist.
- **Cart Checkout:** Allows users to complete course purchases.
- **Course Content:** Displays course content, including videos and other materials.
- **User Details:** Account details including name, email, etc.
- **User Edit Details:** Allows students to edit account details.

#### For Instructors:
- **Dashboard:** Overview of instructor's courses, ratings, and feedback.
- **Insights:** Detailed insights into course views, clicks, etc.
- **Course Management Pages:** Create, update, delete courses, manage content and pricing.
- **View and Edit Profile Details:** View and edit account details.

### Tools and Libraries
- **Frameworks/Libraries:** ReactJS, CSS, Tailwind, Redux
- **Development Environment:** VSCode

### Dependencies
- `axios`: For making HTTP requests.
- `chart.js` and `react-chartjs-2`: For data visualization.
- `concurrently`: To run multiple commands concurrently during development.
- `copy-to-clipboard`: For copying text to the clipboard.
- `react` and `react-dom`: For building and rendering the user interface.
- `react-dropzone`: For handling file uploads.
- `react-hook-form`: For managing form state.
- `react-hot-toast`: For displaying toast notifications.
- `react-icons`: For including icons in the project.
- `react-otp-input`: For handling OTP inputs.
- `react-rating-stars-component`: For displaying rating stars.
- `react-redux` and `redux-toolkit`: For state management.
- `react-router-dom`: For routing within the application.
- `react-scripts`: For running React scripts.
- `react-super-responsive-table`: For making tables responsive.
- `react-type-animation`: For adding type animation effects.
- `swiper`: For implementing sliders.
- `video-react`: For embedding video players.

## Back-end

The back end is built using NodeJS and ExpressJS, with MongoDB as the primary database. The platform uses a monolithic architecture.

### Features and Functionalities
1. **User Authentication and Authorization:** Email and password authentication, OTP verification, forgot password.
2. **Course Management:** Create, read, update, delete courses; manage course content and media.
3. **Payment Integration:** Razorpay integration for payment handling.
4. **Cloud-based Media Management:** Cloudinary for media content.
5. **Markdown Formatting:** Course content stored in Markdown format.

### Tools and Libraries
- **Frameworks/Libraries:** NodeJS, ExpressJS, MongoDB, JWT, Bcrypt, Mongoose

### Data Models and Database Schema
- **Student Schema:** Fields include name, email, password, and course details.
- **Instructor Schema:** Fields include name, email, password, and course details.
- **Course Schema:** Fields include course name, description, instructor details, and media content.

## API Design

The platform's API follows the REST architectural style and is implemented using NodeJS and ExpressJS. It uses JSON for data exchange.

### Sample API Endpoints and Their Functionalities
1. **POST /api/auth/signup:** Create a new user account.
2. **POST /api/auth/login:** Log in using existing credentials and generate a JWT token.
3. **POST /api/auth/verify-otp:** Verify the OTP sent to the user's registered email.
4. **POST /api/auth/forgot-password:** Send an email with a password reset link.
5. **GET /api/courses:** Get a list of all available courses.
6. **GET /api/courses/:id:** Get details of a specific course by ID.
7. **POST /api/courses:** Create a new course.
8. **PUT /api/courses/:id:** Update an existing course by ID.

## Deployment

The deployment process involves hosting the application on various cloud-based services.

### Hosting Environment and Infrastructure
- **Front End:** Deployed using Vercel.
- **Back End:** Hosted on Render.
- **Media Files:** Hosted on Cloudinary.
- **Database:** Hosted on MongoDB Atlas.

## Installation
To install the StudyNotion platform, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/rishika105/StudyNotion
    ```
2. **Navigate to the project directory:**
    ```sh
    cd Study-Notion-EdTech-main
    ```
3. **Install backend dependencies:**
    ```sh
    cd server && npm install
    ```
4. **Install frontend dependencies:**
    ```sh
    cd .. && npm install
    ```

## Configuration
1. **Set up a MongoDB database** and obtain the connection URL.
2. **Set up Mail pass and Mail Port from Gmail.**
3. **Set up a Razorpay account** and obtain the key, secret.
4. **Get jwt secret.**
5. **Set up a Cloudinary account** and obtain cloud name, API key, and API secret.

6. **Create a `.env` file** in the Server directory with the following environment variables:
    ```sh
    MONGODB_URL=<your-mongodb-connection-url>
    JWT_SECRET=<your-jwt-secret-key>
    MAIL_HOST=smtp.gmail.com
    MAIL_PORT=<your-mail-port>
    MAIL_USER=<your-mail-id>
    JWT-SECRET=<your-jwt-secret>
    RAZORPAY_KEY=<your-razorpay-key>
    RAZORPAY_SECRET=<your-razorpay-secret>
    CLOUD_NAME=<your-cloud-name-on-cloudinary>
    API_KEY=<your-cloudinary-api-key>
    API_SECRET=<your-cloudinary-api-secret>
    ```

7. **Create a `.env` file** in the root folder and add:
    ```sh
    REACT_APP_BASE_URL=<your-backend-url-or-your-localhost>
    ```
8. **Change the CORS allow origin** in `index.js` inside the Server directory to the localhost or backend URL you are using.

## Usage
1. **Open a new terminal**
2. **Run the dev script:**
    ```sh
    npm run dev
    ```
3. **Access the application** in your browser at `http://localhost:3000`

## Screenshots

*Insert relevant screenshots here*

## Future Enhancements

1. **Gamification Features:** Increase user engagement with badges, points, and leaderboards.
2. **Personalized Learning Paths:** Tailor learning paths based on student interests and learning styles.
3. **Social Learning Features:** Enable group discussions, peer-to-peer feedback, and collaborative projects.
4. **Mobile App:** Improve accessibility and reach with a mobile app.
5. **Machine Learning-powered Recommendations:** Provide personalized course recommendations.
6. **Virtual Reality/Augmented Reality Integration:** Enhance learning experience with immersive technology.
