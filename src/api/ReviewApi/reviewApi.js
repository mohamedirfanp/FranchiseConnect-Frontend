import axios from "axios";

export const GetFranchiseDetails = async (franchiseName) => {

    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
            query: franchiseName,
            limit: '1',
            lat: '37.359428',
            lng: '-121.925337',
            zoom: '13',
            language: 'en',
            region: 'in',
            fields: 'business_id'
        },
        headers: {
            'X-RapidAPI-Key': '25a48a4641mshdce740cd5a28a22p1662d9jsne44a9c27f6b7',
            'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
    };


    return axios.request(options);

}

export const GetFranchiseReview = async (businessId) => {

    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/business-reviews',
        params: {
            business_id: `${businessId}`,
            limit: '8',
            region: 'in',
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': '25a48a4641mshdce740cd5a28a22p1662d9jsne44a9c27f6b7',
            'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
    };
    
    return axios.request(options);

}
