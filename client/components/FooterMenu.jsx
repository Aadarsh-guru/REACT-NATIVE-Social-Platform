import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, useRoute } from '@react-navigation/native'

const FooterMenu = () => {

    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                <FontAwesome5 style={styles.iconStyle} name='home' color={route.name === 'Home' && 'orange'} />
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <FontAwesome5 style={styles.iconStyle} name='plus-square' color={route.name === 'Post' && 'orange'} />
                <Text>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('My-Posts')} >
                <FontAwesome5 style={styles.iconStyle} name='list' color={route.name === 'My-Posts' && 'orange'} />
                <Text>My Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <FontAwesome5 style={styles.iconStyle} name='user' color={route.name === 'Account' && 'orange'} />
                <Text>Account</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FooterMenu

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25
    }
})