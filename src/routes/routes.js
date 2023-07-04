import  {createBrowserRouter} from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import FranchiseeLogin from "../pages/Franchisee/LoginPage/FranchiseeLogin";
import FranchiseeRegister from "../pages/Franchisee/RegisterPage/FranchiseeRegister";
import HomePage from "../pages/Franchisee/HomePage/HomePage";
import FranchisePage from "../pages/Franchisee/FranchisePage/FranchisePage";

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
    {
        path: "/franchisee/franchise/:id",
        element: <FranchisePage />
    }
]) 