import React from 'react';
import modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <>
                <modal
                    show={error}
                    modalClosed={clearError()}>
                    {error ? error.message : null}
                </modal>
                <WrappedComponent {...props} />
            </>
        );
    }
};

export default withErrorHandler;