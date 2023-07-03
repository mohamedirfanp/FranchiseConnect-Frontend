import  {createBrowserRouter} from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import HomePage from "../pages/HomePage/HomePage";
import FranchiseeLogin from "../pages/Franchisee/LoginPage/FranchiseeLogin";
import FranchiseeRegister from "../pages/Franchisee/RegisterPage/FranchiseeRegister";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: "/franchisee/login",
        element: <FranchiseeLogin />
    },
    {
        path: "/franchisee/register",
        element: <FranchiseeRegister />
    },
    {
        path: "/franchisee/home",
        element: <HomePage />
    },
]) 