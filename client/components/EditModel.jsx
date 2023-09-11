import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'

const EditModel = ({ modalVisible, setModalVisible, post }) => {

    const navigation = useNavigation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle(post?.title)
        setDescription(post?.description)
    }, [post])

    const handleUpdate = async () => {
        try {
            if (!title || !description) {
                return Alert.alert('Fill All Feilds')
            }
            setLoading(true)
            const { data } = await axios.put(`/post/post-update/${post?._id}`, { title, description })
            data && setLoading(false)
            if (data?.success) {
                Alert.alert(data.message)
                setModalVisible(!modalVisible)
                navigation.navigate('Home')
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            Alert.alert('Something went wrong.')
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Update Your Post</Text>
                        <Text>Title</Text>
                        <TextInput onChangeText={(e) => setTitle(e)} value={title} style={styles.inputBox} />
                        <Text>Description</Text>
                        <TextInput onChangeText={(e) => setDescription(e)} value={description} style={styles.inputBox} multiline={true} numberOfLines={4} />
                        <View style={styles.btnContainer} >
                            <Pressable
                                disabled={loading && true}
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handleUpdate()}>
                                <Text style={styles.textStyle}>{loading ? 'Updating..' : 'Update'}</Text>
                            </Pressable>
                            <Pressable
                                disabled={loading && true}
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default EditModel;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 100,
        backgroundColor: 'black'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    inputBox: {
        marginBottom: 20,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 10
    }
});