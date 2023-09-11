import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import FooterMenu from '../components/FooterMenu';
import { usePosts } from '../context/PostsProvider';
import PostCard from '../components/PostCard';

const Home = () => {

    const { posts, getAllPost } = usePosts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllPost()
        setTimeout(() => {
            setRefreshing(false);
        }, 1000)
    }, [])

    return (
        <View style={styles.container} >
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <PostCard posts={posts} />
            </ScrollView>
            <View >
                <FooterMenu />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10
    }
})