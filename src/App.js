import "./App.css";
import { Sidebar } from "./component/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserDashboard } from "./component/user/UserDashboard";
import { Login } from "./component/Login";
import { Signup } from "./component/Signup";
import { Registration } from "./component/Registration";
import { MainPage } from "./component/MainPage";
import { ForgotPassword } from "./component/ForgotPassword";
import { ResetPassword } from "./component/ResetPassword";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/registration", element: <Registration /> },
  { path: "/singUp", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  {
    path: "/user",
    element: <Sidebar />,
    children: [
      { path: "", element: <UserDashboard /> },
      //   { path: "/user/profile", element: <UserProfile /> },
      //   { path: "/user/bookService", element: <BookService /> },
      //   { path: "/user/bookservicedetials/:id", element: <BookServiceDetails /> },
      //   { path: "/user/bookings", element: <MyBookings /> },
      //   { path: "/user/fetchdetails/:id", element: <FetchDetails /> },
      //   { path: "/user/payment/:id", element: <Payment /> },
      //   { path: "/user/paymentdemo/:id", element: <PaymentDemo /> },
    ],
  },
  {
    path: "/serviceProvider",
    element: <Sidebar />,
    // children: [
    //   {
    //     path: "/serviceprovider/dashboard",
    //     element: <ServiceProviderDashboard />,
    //   },
    //   {
    //     path: "/serviceprovider/profile",
    //     element: <ServiceProviderProfile />,
    //   },
    //   {
    //     path: "/serviceprovider/addservice",
    //     element: <AddService />,
    //   },
    //   {
    //     path: "/serviceprovider/myservices",
    //     element: <MyServices />,
    //   },
    //   {
    //     path: "/serviceprovider/servicelist",
    //     element: <ServiceList />,
    //   },
    //   {
    //     path: "/serviceprovider/updateservice/:id",
    //     element: <UpdateService />,
    //   },
    //   {
    //     path: "/serviceprovider/details/:id",
    //     element: <Servicedetails />,
    //   },
    //   {
    //     path: "/serviceprovider/servicelist",
    //     element: <ServiceList />,
    //   },
    // ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
