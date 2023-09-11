import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register'
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthProvider'
import HeaderMenu from './HeaderMenu';
import Post from '../screens/Post';
import MyPosts from '../screens/MyPosts';
import Account from '../screens/Account';

export default function ScreenMenu() {

    const { auth } = useAuth()
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Login'
        >
            {
                (auth?.token && auth?.user) ?
                    (
                        <>
                            <Stack.Screen name='Home' component={Home} options={{ title: 'My App', headerRight: () => <HeaderMenu />, animation: 'default' }} />
                            <Stack.Screen name='Post' component={Post} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu />, animation: 'default' }} />
                            <Stack.Screen name='My-Posts' component={MyPosts} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu />, animation: 'default' }} />
                            <Stack.Screen name='Account' component={Account} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu />, animation: 'default' }} />
                        </>
                    )
                    :
                    (
                        <>
                            <Stack.Screen name='Register' component={Register} options={{ headerShown: false, animation: 'default' }} />
                            <Stack.Screen name='Login' component={Login} options={{ headerShown: false, animation: 'default' }} />
                        </>
                    )
            }
        </Stack.Navigator>
    );
}