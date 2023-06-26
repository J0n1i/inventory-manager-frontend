import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Barcode from '@kichiyaki/react-native-barcode-generator'

export default function Item({ navigation, route }) {
    const item = route.params.item
    console.log(item)

    function DeleteItem() {
        fetch(`http://192.168.1.109:3000/items/${item._id}`, {
            method: 'DELETE',
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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Text style={{
                    fontSize: 20
                }}>{item.name}</Text>
                <Text style={{
                }}>{item.description}</Text>
                <Text style={{
                }}>Quantity: {item.quantity}</Text>

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
            </View>
            <Pressable title="Delete" onPress={() => { DeleteItem() }}
                style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 10,
                    margin: 10
                }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center'
                }}>Delete</Text>
            </Pressable>
        </>
    )
}