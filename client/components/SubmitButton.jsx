import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const SubmitButton = ({ name, loading, setLoading, handleSubmit }) => {
    return (
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn} >
            <Text style={styles.btnText} >{loading ? 'Please Wait..' : name}</Text>
        </TouchableOpacity>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: '#1e2225',
        height: 50,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '400'
    }
})