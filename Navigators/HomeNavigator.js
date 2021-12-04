import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from "../Screens/Products/SingleProduct"

const NativeStack = createNativeStackNavigator()

function MyStack() {
    return (
        <NativeStack.Navigator>
            <NativeStack.Screen
            name='Home'
            component={ProductContainer}
            options={{
                headerShown: false,
            }}
            />
            <NativeStack.Screen
            name='Product Detail'
            component={SingleProduct}
            options={{
                headerShown: false,
            }}
            />
        </NativeStack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}