



const Role = "Role";

const AuthToken = "Token";

const FranchiseExist = "FranchiseExist";



// export const setFranchisee = (franchisee) => {
//     localStorage.setItem(Franchisee, JSON.stringify(franchisee));
// }


// export const getFranchisee = ()  => {
//     let user = localStorage.getItem(Franchisee);
//     if(!user) return null; 
//     return JSON.parse(user);
// }

export const setRole = (role) => {
    localStorage.setItem(Role, role);
}

export const getRole = () => {
   return  localStorage.getItem(Role);
}

export const setAuthToken = (token) => {
    localStorage.setItem(AuthToken, token);
}

export const getAuthToken = () => {
    return localStorage.getItem(AuthToken);
}

export const setFranchiseExist = (exist) => {
    return localStorage.setItem(FranchiseExist, exist);
}

export const getFranchiseeExist = () => {
    return localStorage.getItem(FranchiseExist);
   
}

// export const setFranchisorAuthToken = (token) => {
//     localStorage.setItem(FranchisorToken, token);
// }

// export const getFranchisorAuthToken = () => {
//     return localStorage.getItem(FranchisorToken);
// }


export const Logout = () => {
    localStorage.removeItem(Role);
    localStorage.removeItem(AuthToken);
    localStorage.removeItem(FranchiseExist)
}


// export const FranchisorLogout = () => {
//     localStorage.removeItem(Franchisor);
//     localStorage.removeItem(FranchisorToken);
// }