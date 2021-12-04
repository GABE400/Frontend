import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native'
import { Actionsheet, VStack, HStack, Modal, Image, Text } from 'native-base';

var { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    return(
        <Actionsheet.Content style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <VStack
                    onPress={() => {
                        props.navigation.navigate("Product Details", {item: item})
                    }}
                    key={item._id}
                    avatar
                    >
                        <HStack>
                            <Image
                               source={{uri: item.image ? 
                                item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                      }}
                            />
                        </HStack>
                        <Modal.Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Modal.Body>
                    </VStack>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center'}}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </Actionsheet.Content>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProduct;