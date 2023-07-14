import { useState, useLayoutEffect } from "react";

import {getAuthToken, getRole} from "../constants/LocalStorage";

import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const PrivateAdminRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useLayoutEffect(() => {

        const token = getAuthToken();
        const role = getRole();
        // const decode = jwt.decode(token)
        // console.log(decode);
        if(token && role === 'admin')
        setIsAuthenticated(true)
        else
        setIsAuthenticated(false)

    }, []);

    return isAuthenticated ? children : <NotFoundPage />

}

export default PrivateAdminRoute;