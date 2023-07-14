import axios from "axios";

export const GetFranchiseDetails = async (franchiseName) => {

    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: `${franchiseName}, India`,
          limit: '1',
          lat: '13.0827',
          lng: '80.2707',
          zoom: '13',
          language: 'en',
          region: 'in',
          fields: 'business_id'
        },
        headers: {
          'X-RapidAPI-Key': '073cda2538msh15be656d1aa0693p191568jsn657482517cd6',
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
            limit: '5',
            region: 'in',
            language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': '073cda2538msh15be656d1aa0693p191568jsn657482517cd6',
          'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
    };
    
    return axios.request(options);

}
