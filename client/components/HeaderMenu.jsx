import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useAuth } from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HeaderMenu = () => {

    const { auth, setAuth } = useAuth();

    const handleLogout = async () => {
        setAuth({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        alert('Logout Success!')
    }

    return (
        <View>
            <TouchableOpacity onPress={handleLogout} >
                <FontAwesome5 color='red' style={styles.iconStyle} name='sign-out-alt' />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderMenu

const styles = StyleSheet.create({
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25
    }
})