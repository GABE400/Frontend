import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";

const NativeStack = createNativeStackNavigator();

function MyStack() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <NativeStack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
        }}
      />
    </NativeStack.Navigator>
  );
}

export default function CartNavigator() {
  return <MyStack />;
}
