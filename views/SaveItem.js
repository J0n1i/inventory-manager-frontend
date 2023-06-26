import { useEffect, useState } from 'react'
import { Text, TextInput, Button } from 'react-native'
import Barcode from '@kichiyaki/react-native-barcode-generator'

function SaveItem({ navigation, route }) {
    const [item, setItem] = useState({
        name: '',
        description: '',
        barcode: '',
        quantity: 1,
    })

    useEffect(() => {
        if (route.params?.barcode) {
            setItem({ ...item, barcode: route.params.barcode })
        }
    }, [route.params?.barcode])


    function saveItem() {
        fetch("http://192.168.1.109:3000/items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                navigation.navigate('Home')
            })
            .catch(err => console.log(err))


    }


    return (
        <>
            <Text style={{ fontSize: 20 }}>Name</Text>
            <TextInput
                onChangeText={text => setItem({ ...item, name: text })}
                value={item.name}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Text style={{ fontSize: 20 }}>Description</Text>
            <TextInput
                onChangeText={text => setItem({ ...item, description: text })}
                value={item.description}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Text style={{ fontSize: 20 }}>quantity</Text>
            <TextInput
                onChangeText={text => setItem({ ...item, quantity: text })}
                value={item.quantity}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />

            {item.barcode != '' ?
                <Barcode value={item.barcode.toString()}
                    text={item.barcode.toString()}
                    style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        width: "90%",
                        alignSelf: 'center',
                        height: 100,
                    }}
                    maxWidth={300}
                /> : null}

            <Button title="Submit"
                onPress={() => saveItem()}
            />


        </>
    )
}



export default SaveItem