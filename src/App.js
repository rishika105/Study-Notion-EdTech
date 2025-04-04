import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "../src/components/core/Auth/OpenRoute";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "../src/components/core/Dashboard/Commons/MyProfile";
import Setting from "./components/core/Dashboard/Commons/Settings/index";
import EnrolledCourses from "./components/core/Dashboard/StudentDasboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/StudentDasboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/InstructorDashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/InstructorDashboard/InstructorCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/InstructorDashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/Dashboard/StudentDasboard/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ManageCategories from "./components/core/Dashboard/AdminDashboard/ManageCategories";
import AddCategory from "./components/core/Dashboard/AdminDashboard/AddCategory";
import EditCategory from "./components/core/Dashboard/AdminDashboard/EditCategory";
import { setToken } from "./slices/authSlice";
import { setUser } from "./slices/profileSlice";
import { loadCart } from "./slices/cartSlice";

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />

        <Route
          path="/catalog/:catalogName"
          element={
            <OpenRoute>
              <Catalog />
            </OpenRoute>
          }
        />

        <Route
          path="/courses/:courseId"
          element={
            <OpenRoute>
              <CourseDetails />
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={
            <OpenRoute>
              <AboutUs />
            </OpenRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <OpenRoute>
              <ContactUs />
            </OpenRoute>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route
                path="dashboard/manage-categories"
                element={<ManageCategories />}
              />
              <Route path="dashboard/add-category" element={<AddCategory />} />
              <Route
                path="dashboard/edit-category/:categoryId"
                element={<EditCategory />}
              />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route></Route>

        <Route element={<Error />} path="*"></Route>
      </Routes>
    </div>
  );
}

export default App;
