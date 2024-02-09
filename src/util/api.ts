import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function geocoding(formattedAddress: string) { 
    axios({
        method: "get",
        url: `/util/geocoding/${formattedAddress}`,
        responseType: 'json'
      })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

