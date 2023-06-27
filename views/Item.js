import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Barcode from '@kichiyaki/react-native-barcode-generator'

export default function Item({ navigation, route }) {
    const [item, setItem] = useState(route.params.item)

    function DeleteItem() {
        fetch(`http://192.168.1.109:3000/items/${item._id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('Home')
            })
            .catch(err => console.log(err))
    }


    function updateItem(item) {
        fetch("http://192.168.1.109:3000/items/" + item._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data)
            }
            )
            .catch(err => console.log(err))
    }

    function setAmount(e) {
        if (e != '') {
            setItem({ ...item, quantity: parseInt(e) })
            updateItem({ ...item, quantity: parseInt(e) })
        }
        else {
            setItem({ ...item, quantity: 0 })
            updateItem({ ...item, quantity: 0 })
        }
    }


    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',

                width: '100%',
                alignSelf: 'center',

            }}
        >

            <Text style={{
                fontSize: 20,

            }}>{item.name}</Text>
            <Text style={{
                fontSize: 20,

            }}>{item.description}</Text>



            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>

                <Pressable
                    onPress={() => {
                        if (item.quantity > 0) {
                            setItem({ ...item, quantity: item.quantity - 1 })
                            updateItem({ ...item, quantity: item.quantity - 1 })
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
                        updateItem({ ...item, quantity: item.quantity + 1 })
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
                <Barcode value={item.barcode}
                    text={item.barcode}
                    style={{
                        width: "90%",
                        alignSelf: 'center',
                        height: 100,

                    }}
                    maxWidth={300}
                /> : null}

            <Pressable title="Delete" onPress={() => { DeleteItem() }}
                style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
                }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center'
                }}>Delete</Text>
            </Pressable>
        </View>
    )
}