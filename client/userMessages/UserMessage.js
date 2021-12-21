import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SharedUtilities from '../SharedUtilities'
const { gray, blue, darkgray } = SharedUtilities.style;

export default function UserMessage({ body }) {
    body.arr = body.arr || [];
    body.type = body.type || [];

    if (body.arr.length > 4) body.arr.slice(3).push('...');
    if (body.arr.length !== 0) body.arr = ['\n', ...body.arr].join('\n');

    const text = body.text + body.arr; 
    console.log(body);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.btnContainer}>
                {body.type.includes('yes') && <Btn>{'Yes'}</Btn>}
                {body.type.includes('no') && <Btn>{'No'}</Btn>}
                {body.type.includes('ok') && <Btn>{'Ok'}</Btn>}
                {body.type.includes('cancel') && <Btn>{'Cancel'}</Btn>}
            </View>
        </View>
    )
}

function Btn({ children }) {
    return (
        <View style={styles.btn}>
            <Text style={styles.text, {fontSize: '2em'}}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%, -50%)',
        padding: '1em',
        width: '50%',
        backgroundColor: gray,

        borderRadius: '200',
        borderWidth: '2',
        borderColor: darkgray
    },
    text: { 
        color: blue,
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2em',
        width: '100%',
    },
    btn: {
        backgroundColor: darkgray,
        padding: '1em',
        borderRadius: '20',
        borderWidth: '2'
    }
})
