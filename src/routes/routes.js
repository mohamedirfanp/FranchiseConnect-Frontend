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
import PrivateFranchiseeRoute from "./PrivateFranchiseeRoute";
import PrivateFranchisorRoute from "./PrivateFranchisorRoute";
import ConnectPage from "../pages/ConnectPage/ConnectPage";
import SupportPage from "../pages/SupportPage/SupportPage";
import AccountPage from "../pages/AccountPage/AccountPage";
// import Dashboard from '../pages/AdminPage/Dashboard';
import QueryPage from "../pages/AdminPage/QueryPage";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: "/notfound",
        element: <NotFoundPage />
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
        element: 
        <PrivateFranchiseeRoute>
            <HomePage />
        </PrivateFranchiseeRoute>
    },
    {
        path: "/franchisee/franchise/:id",
        element:
        <PrivateFranchiseeRoute>
            <FranchisePage />
        </PrivateFranchiseeRoute> 
    },
    {
        path: "/franchisee/wishlist",
        element: 
        <PrivateFranchiseeRoute>
            <WishlistPage />
        </PrivateFranchiseeRoute>
    },

    {
        path: '/account',
        element:<AccountPage/>,
    },
    {
        path: "/franchisee/connect",
        element: 
        <PrivateFranchiseeRoute>
            <ConnectPage />
        </PrivateFranchiseeRoute>
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
        path: "/franchisor/dashboard",
        element:
        <PrivateFranchisorRoute>
            <Dashboard /> 
        </PrivateFranchisorRoute> 
    },
    {
        path: "/franchisor/request",
        element:
        <PrivateFranchisorRoute>
            <RequestPage />
        </PrivateFranchisorRoute> 
    }, {
        path: "/franchisor/connect",
        element: 
        <PrivateFranchisorRoute>
            <ConnectPage />
        </PrivateFranchisorRoute>
    },
    // {
    //     path: "/admin/dashboard",
    //     element: <Dashboard />
    // },
    {
        path: "/query",
        element: <QueryPage />
    }
]) 