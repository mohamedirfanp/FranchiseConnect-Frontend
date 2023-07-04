
const Franchisee = "Franchisee";
const Franchisor = "Franchisor";

const Role = "Role";

const FranchiseeToken = "FranchiseeToken";
const FranchisorToken = "FranchisorToken";

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

export const setFranchiseeAuthToken = (token) => {
    localStorage.setItem(FranchiseeToken, token);
}

export const getFranchiseeAuthToken = () => {
    return localStorage.getItem(FranchiseeToken);
}

export const setFranchisorAuthToken = (token) => {
    localStorage.setItem(FranchisorToken, token);
}

export const getFranchisorAuthToken = () => {
    return localStorage.getItem(FranchisorToken);
}


export const FranchiseeLogout = () => {
    localStorage.removeItem(Franchisee);
    localStorage.removeItem(FranchiseeToken);
}


export const FranchisorLogout = () => {
    localStorage.removeItem(Franchisor);
    localStorage.removeItem(FranchisorToken);
}