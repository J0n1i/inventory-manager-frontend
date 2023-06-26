import { Text, TouchableOpacity } from "react-native"
import React, { useState, useEffect } from 'react'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import Items from "../components/Items"


function HomeScreen({ navigation }) {

  return (
    <>
      <Items navigation={navigation} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Scanner')}
        style={{
          backgroundColor: '#2196F3',
          borderRadius: 50,
          width: 70,
          height: 70,
          position: 'absolute',
          bottom: 20,
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'rgba(0,0,0,0.2)',
          borderWidth: 1,
        }}
      >
        <Text style={{
          fontSize: 50,
          color: 'white',
          position: 'absolute',
          bottom: -3,
          textAlignVertical: 'center',
          textAlign: 'center',
        }}>+</Text>
      </TouchableOpacity>

    </>
  )
}

export default HomeScreen