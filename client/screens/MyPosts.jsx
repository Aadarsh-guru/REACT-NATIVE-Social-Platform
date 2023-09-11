import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterMenu from '../components/FooterMenu';
import PostCard from '../components/PostCard';
import axios from 'axios'

const MyPosts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)

    const getUserPosts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/post/get-user-posts`)
            setLoading(false)
            setPosts(data?.posts)
        } catch (error) {
            setLoading(false)
            console.log(error);
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getUserPosts();
    }, [])

    return (
        <View style={styles.container} >
            <ScrollView>
                <PostCard myPostScreen={true} posts={posts} />
            </ScrollView>
            <View >
                <FooterMenu />
            </View>
        </View>
    )
}

export default MyPosts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10
    }
})