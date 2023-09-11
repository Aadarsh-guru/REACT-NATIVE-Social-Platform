import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import EditModel from './EditModel'

const PostCard = ({ posts, myPostScreen }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [post, setPost] = useState({})

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/post/delete-post/${id}`)
            Alert.alert(res.data?.message)
        } catch (error) {
            console.log(error);
            Alert.alert('something went wrong.')
        }
    }


    return (
        <View>
            <Text style={styles.heading} >Total Posts {posts?.length}</Text>
            {
                myPostScreen && <EditModel post={post} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            }
            {
                posts?.map((post, index) => (
                    <View style={styles.card} key={index}>
                        {
                            myPostScreen &&
                            (<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} >
                                <Text >
                                    <FontAwesome5Icon style={styles.iconStyle} name='pen' onPress={() => { setPost(post), setModalVisible(!modalVisible) }} size={16} color='darkblue' /> {" "}
                                </Text>
                                <Text >
                                    <FontAwesome5Icon style={styles.iconStyle} name='trash' onPress={() => handleDelete(post?._id)} size={16} color='red' /> {" "}
                                </Text>
                            </View>)
                        }
                        <Text style={styles.title} >Title : {post?.title}</Text>
                        <Text style={styles.desc} >{post?.description}</Text>
                        <View style={styles.footer} >
                            <Text>
                                <FontAwesome5Icon style={styles.iconStyle} name='user' color='orange' /> {" "}
                                {post?.postedBy?.name}
                            </Text>
                            <Text>
                                <FontAwesome5Icon style={styles.iconStyle} name='clock' color='orange' /> {" "}
                                {moment(post?.createdAt).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    heading: {
        color: 'green',
        textAlign: 'center'
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 5,
        marginVertical: 10
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    desc: {
        marginTop: 10,
    }
})