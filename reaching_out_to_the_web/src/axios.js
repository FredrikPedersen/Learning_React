import axios from "axios";

//Use a custom instance to override default values wherever needed.
const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE"; //Seems to work even though WebStorm doesen't recognize "common".

export default instance;