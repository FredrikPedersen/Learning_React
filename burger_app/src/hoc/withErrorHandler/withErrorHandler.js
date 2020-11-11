import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [errorState, setErrorState] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setErrorState(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setErrorState(error);
        });

        /*
        Runs cleanup whenever the dependencies are changed, and then the cleanup function
        (return function) when the component is unmounted.

        Replaces componentWillUnmount as the cleanup function
        */
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor])

        const errorConfirmedHandler = () => {
            setErrorState(null);
        };

        return (
            <>
                <Modal
                    show={errorState}
                    modalClosed={errorConfirmedHandler}>
                    {errorState ? errorState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    }
};

export default withErrorHandler;