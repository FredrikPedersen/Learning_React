import {useState, useEffect} from "react";

const useHttpErrorHandler = (httpClient) => {
    const [errorState, setErrorState] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setErrorState(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setErrorState(error);
    });

    /*
    Runs cleanup whenever the dependencies are changed, and then the cleanup function
    (return function) when the component is unmounted.

    Replaces componentWillUnmount as the cleanup function
    */
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor])

    const errorConfirmedHandler = () => {
        setErrorState(null);
    };

    return [errorState, errorConfirmedHandler]
}

export default useHttpErrorHandler;