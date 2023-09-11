import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../components/InputBox'
import SubmitButton from '../../components/SubmitButton'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../context/AuthProvider'

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { auth, setAuth } = useAuth();

    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!email || !password) {
                setLoading(false)
                return Alert.alert('Please fill all feilds.')
            }
            const { data } = await axios.post(`/auth/login`, { email, password })
            alert(data?.message)
            setAuth({ ...auth, user: data?.user, token: data?.token })
            await AsyncStorage.setItem('@auth', JSON.stringify(data))
            navigation.navigate('Home')
            setLoading(false)
        } catch (error) {
            alert(error.response.data.message)
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.pageTitle} >Login</Text>
            <View style={{ marginHorizontal: 20 }} >
                <InputBox name={'Email'} keyboardType={'email-address'} autoComplete={'email'} value={email} setValue={setEmail} />
                <InputBox name={'Password'} secureTextEntry={true} autoComplete={'password'} value={password} setValue={setPassword} />
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton name={'Login'} loading={loading} setLoading={setLoading} handleSubmit={handleSubmit} />
            <Text style={styles.linkText} >Don't have an account ? <Text style={styles.link} onPress={() => navigation.navigate('Register')} >REGISTER</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e1d5c9'
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1e2225',
        marginBottom: 20
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: '#af9f85'
    },
    linkText: {
        textAlign: 'center'
    },
    link: {
        color: 'red'
    }
})

export default Login;