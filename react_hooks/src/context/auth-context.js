import React, {useState} from "react";

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

const AuthContextProvider = (props) => {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

    const loginHandler = () => {
        setIsAuthenticatedState(true);
    }

    return (
        <AuthContext.Provider value={{login: loginHandler, isAuth: isAuthenticatedState}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;