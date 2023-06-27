import { Text, View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

export default function Items({ navigation }) {
    const [items, setItems] = useState([])

    function getItems() {
        fetch("http://192.168.1.109:3000/items", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setItems(data)
            })
            .catch(err => console.log(err))
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        getItems()
    }, [isFocused])

    function navigateToItem(item) {
        navigation.navigate('Item', { item: item })
    }

    return (
        <>
            <View

                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 10
                }}>
                <Text style={{ fontSize: 20 }}>Name</Text>
                <Text style={{ fontSize: 20 }}>Quantity</Text>
            </View>



            <ScrollView style={{ height: 400 }}>
                {items.map((item, index) => {
                    return (
                        <Pressable key={index}
                            onPress={() => navigateToItem(item)}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: 'gray',
                                padding: 10
                            }}>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    padding: 10
                                }}>
                                <Text style={{
                                    fontSize: 20
                                }}>{item.name}</Text>

                                <Text style={{
                                    fontSize: 15
                                }}>{item?.description}</Text>
                            </View>

                            <Text style={{
                                fontSize: 20,
                            }}>{item.quantity}</Text>

                        </Pressable>
                    )
                })}
            </ScrollView>
        </>
    )
}