import "./App.css";
import Sidebar from "./component/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./component/user/Profile";
import UserDashboard from "./component/user/UserDashboard";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Registration from "./component/Registration";
import MainPage from "./component/MainPage";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import BookService from "./component/user/BookService";
import BookServiceDetails from "./component/user/BookServiceDetails";
import MyBookings from "./component/user/MyBookings";
import FetchDetails from "./component/user/FetchDetails";
import PaymentDemo from "./component/PaymentDemo";
import ServiceProviderDashboard from "./component/serviceprovider/ServiceProviderDashboard";
import ServiceProviderProfile from "./component/serviceprovider/Profile";
import AddService from "./component/serviceprovider/AddService";
import MyServices from "./component/serviceprovider/MyServices";
import ServiceList from "./component/serviceprovider/ServiceList";
import UpdateService from "./component/serviceprovider/UpdateService";
import Servicedetails from "./component/serviceprovider/Servicedetails";
import Logout from "./component/Logout";
import Payment from "./component/Payment";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/registration", element: <Registration /> },
  { path: "/singUp", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/logout", element: <Logout /> },
  {
    path: "/user",
    element: <Sidebar />,
    children: [
      { path: "", element: <UserDashboard /> },
      { path: "/user/profile", element: <UserProfile /> },
      { path: "/user/bookServices", element: <BookService /> },
      { path: "/user/bookservicedetials/:id", element: <BookServiceDetails /> },
      { path: "/user/bookings", element: <MyBookings /> },
      { path: "/user/fetchdetails/:id", element: <FetchDetails /> },
      { path: "/user/payment/:id", element: <Payment /> },
      { path: "/user/paymentdemo/:id", element: <PaymentDemo /> },
    ],
  },
  {
    path: "/serviceProvider",
    element: <Sidebar />,
    children: [
      {
        path: "",
        element: <ServiceProviderDashboard />,
      },
      {
        path: "/serviceProvider/profile",
        element: <ServiceProviderProfile />,
      },
      {
        path: "/serviceProvider/addService",
        element: <AddService />,
      },
      {
        path: "/serviceProvider/myServices",
        element: <MyServices />,
      },
      {
        path: "/serviceProvider/serviceList",
        element: <ServiceList />,
      },
      {
        path: "/serviceProvider/updateService/:id",
        element: <UpdateService />,
      },
      {
        path: "/serviceProvider/details/:id",
        element: <Servicedetails />,
      },
      {
        path: "/serviceProvider/serviceList",
        element: <ServiceList />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
