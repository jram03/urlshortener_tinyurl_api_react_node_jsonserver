import axios from "axios";

// export const key = "caf1d744a58149715f5f5c10bcc21d0769ee6ca6";

const api = axios.create({
    baseURL: "https://api-ssl.bitly.com/v4/shorten",
    // mode : "cors",
    headers:{
        Authorization: 'caf1d744a58149715f5f5c10bcc21d0769ee6ca6',
        Accept : 'application/json'
        // ,PUT,POST,DELETE,PATCH,OPTIONS"
    }
})

export default api;