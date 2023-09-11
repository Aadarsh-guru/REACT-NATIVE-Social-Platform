import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FooterMenu from '../components/FooterMenu'
import axios from 'axios'
import { usePosts } from '../context/PostsProvider'

const Post = ({ navigation }) => {

    const { posts, setPosts } = usePosts();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);


    const handlePost = async () => {
        try {
            if (!title || !description) {
                return alert('fill all feilds')
            }
            setLoading(true)
            const { data } = await axios.post('/post/create-post', { title, description })
            data && setLoading(false)
            if (data?.success) {
                setPosts([...posts, data?.post])
                setDescription('')
                setTitle('')
                alert(data.message)
                navigation.navigate('My-Posts')
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <View style={styles.container} >
            <ScrollView>
                <View style={{ alignItems: 'center' }} >
                    <Text style={styles.heading}>
                        Create a post
                    </Text>
                    <TextInput value={title} onChangeText={(e) => setTitle(e)} style={styles.inputBox} placeholder='Add post title' placeholderTextColor={'gray'} />
                    <TextInput value={description} onChangeText={(e) => setDescription(e)} style={styles.inputBox} placeholder='Add post description' multiline numberOfLines={6} placeholderTextColor={'gray'} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handlePost()} style={styles.postBtn} >
                        <Text style={styles.postBtnText} >
                            <FontAwesome5 disabled={loading && true} style={styles.iconStyle} name='plus-square' size={18} />  {' '}
                            {
                                loading ? 'creating..' : 'CREATE POST'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                <FooterMenu />
            </View>
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 20
    },
    heading: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    inputBox: {
        backgroundColor: '#ffffff',
        width: 320,
        marginTop: 30,
        fontSize: 16,
        paddingLeft: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        textAlignVertical: 'top',
        paddingTop: 10
    },
    postBtn: {
        backgroundColor: 'black',
        width: 300,
        marginTop: 30,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    postBtnText: {
        color: '#ffffff',
        fontSize: 18,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    }
})