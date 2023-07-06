import  {createBrowserRouter} from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import FranchiseeLogin from "../pages/Franchisee/LoginPage/FranchiseeLogin";
import FranchiseeRegister from "../pages/Franchisee/RegisterPage/FranchiseeRegister";
import HomePage from "../pages/Franchisee/HomePage/HomePage";
import FranchisePage from "../pages/Franchisee/FranchisePage/FranchisePage";
import Dashboard from "../pages/Franchisor/HomePage/Dashboard";
import FranchisorLogin from "../pages/Franchisor/LoginPage/FranchisorLogin";
import FranchisorRegister from "../pages/Franchisor/RegisterPage/FranchisorRegister";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import WishlistPage from "../pages/Franchisee/WishlistPage/WishlistPage";
import RequestPage from "../pages/Franchisor/RequestPage/RequestPage";

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
    },
    {
        path: "/franchisor/dashboard",
        element: <Dashboard /> 
    },
    {
        path: "/franchisor/login",
        element: <FranchisorLogin />
    },
    {
        path: "/franchisor/register",
        element: <FranchisorRegister />
    },
    {
        path: "/notfound",
        element: <NotFoundPage />
    },
    {
        path: "/franchisee/wishlist",
        element: <WishlistPage />
    },
    {
        path: "/frachisor/request",
        element: <RequestPage />
    }
]) 