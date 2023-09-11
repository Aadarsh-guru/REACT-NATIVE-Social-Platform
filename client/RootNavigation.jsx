import React from 'react'
import AuthProvider from './context/AuthProvider'
import ScreenMenu from './components/ScreenMenu'
import PostsProvider from './context/PostsProvider'

const RootNavigation = () => {
    return (
        <AuthProvider>
            <PostsProvider>
                <ScreenMenu />
            </PostsProvider>
        </AuthProvider>
    )
}

export default RootNavigation