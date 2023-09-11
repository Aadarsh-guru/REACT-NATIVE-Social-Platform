import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const PostsContext = createContext(null);

export const usePosts = () => {
    return useContext(PostsContext);
}

const PostsProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllPost = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/post/get-all-posts')
            data && setLoading(false)
            if (data?.success) {
                setPosts(data?.posts)
            } else {
                alert(data?.message)
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllPost();
    }, [])


    return (
        <PostsContext.Provider value={{
            posts, setPosts,
            loading, setLoading,
            getAllPost
        }}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsProvider