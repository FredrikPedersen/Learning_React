import axios from "axios";

const instance = axios.create( {
   baseURL: "https://react-burger-app-8f293.firebaseio.com/"
});

export default instance;