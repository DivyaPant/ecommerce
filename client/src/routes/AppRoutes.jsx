import {Routes, Route} from 'react-router';
import AuthLayout from '../components/Auth/AuthLayout';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Landing from "../pages/Landing/Landing";

const AppRoutes = ()=> {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
            </Route>
            <Route path="/" element={<Landing />} />
        </Routes>
    )
}

export default AppRoutes;

{/* <Routes>
     <Route path="/" element={<div>Landing</div>} />
    <Route path="home" element={<div>Home</div>} />
     <Route path="about" element={<div>About</div>} />
     
     <Route path="concerts">
    <Route index element={<div>Concert Home</div>} />
    <Route path=":city" element={<div>Concert Home : city</div>} />
    <Route path="trending" element={<div>Concert Home : Trending</div>} />
  </Route>
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<div>Dashboard Home</div>} />
    <Route path="settings" element={<div>Dashboard Settings</div>} />
  </Route>
  </Routes> */}

//    function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* will either be <Home/> or <Settings/> */}
//       <Outlet />
//     </div>
//   );
// }