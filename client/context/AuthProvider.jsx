import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        const localData = async () => {
            const data = await AsyncStorage.getItem('@auth')
            const parsedData = JSON.parse(data)
            setAuth({ ...auth, user: parsedData?.user, token: parsedData?.token })
        }
        localData();
        if (auth?.token) {

        }
    }, [])

    axios.defaults.headers.common['Authorization'] = auth?.token;
    axios.defaults.baseURL = 'https://pyzdjbtpme.execute-api.ap-south-1.amazonaws.com/api/v1'

    return (
        <AuthContext.Provider value={{
            auth, setAuth
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider