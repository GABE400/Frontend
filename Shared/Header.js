import React from 'react'
import { StyleSheet, Image, SafeAreaView, View } from 'react-native'

const Header = () => {
    return(
        <SafeAreaView style={styles.header}>
            <Image
                source={require("../assets/Logo.jpeg")}
                resizeMode="contain"
                style={{ height: 50 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: '#c31432'
    }
})

export default Header;