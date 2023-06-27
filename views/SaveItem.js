import { useEffect, useState } from 'react'
import { Text, TextInput, Button, View, Pressable } from 'react-native'
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

    //check if barcode is already in database



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

    function setAmount(e) {
        if (e != '') {
            setItem({ ...item, quantity: parseInt(e) })
        }
        else {
            setItem({ ...item, quantity: 0 })
        }
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


            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>

                <Pressable
                    onPress={() => {
                        if (item.quantity > 0) {
                            setItem({ ...item, quantity: item.quantity - 1 })
                        }

                    }}
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        margin: 0,
                        borderBottomStartRadius: 10,
                        borderTopStartRadius: 10,
                        backgroundColor: 'lightgray'

                    }}>
                    <Text style={{
                        fontSize: 20,
                        margin: 0,
                        padding: 0
                    }}>-</Text>
                </Pressable>


                <TextInput

                    onChangeText={text => { setAmount(text) }}
                    keyboardType='numeric'
                    value={item.quantity.toString()}
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: 100,
                        textAlign: 'center',
                        fontSize: 20,
                        paddingVertical: 10,
                    }}
                />

                <Pressable
                    onPress={() => {
                        //item.quantity int
                        setItem({ ...item, quantity: item.quantity + 1 })
                    }}
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        margin: 0,
                        borderBottomEndRadius: 10,
                        borderTopEndRadius: 10,
                        backgroundColor: 'lightgray',
                        paddingVertical: 10,
                    }}>
                    <Text style={{
                        fontSize: 20,
                    }}>+</Text>
                </Pressable>
            </View>

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