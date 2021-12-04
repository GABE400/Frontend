import React, { useContext, useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, HStack, Heading, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './CartItem';

import { EvilIcons } from '@expo/vector-icons';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import AuthGlobal from '../../Context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';


var { height, width} = Dimensions.get('window');

const Cart = (props) => {
  const context = useContext(AuthGlobal);

  // Add this
  const [productUpdate, setProductUpdate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    getProducts();
    return () => {
      setProductUpdate();
      setTotalPrice();
    };
  }, [props]);

  const getProducts = () => {
    var products = [];
    props.cartItems.forEach((cart) => {
      axios
        .get(`${baseURL}products/${cart.product}`)
        .then((data) => {
          products.push(data.data);
          setProductUpdate(products);
          var total = 0;
          products.forEach((product) => {
            const price = (totalPrice += product.price);
            setTotalPrice(price);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <>
      {productUpdate ? (
        <Container>
          
          <SwipeListView
            data={productUpdate}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <EvilIcons name='trash' color={'black'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <HStack space={18} alignItems='center' w='100%'>
              <HStack>
                <Text style={styles.price}>ZMK {totalPrice}</Text>
              </HStack>
              <HStack>
                <EasyButton danger medium onPress={() => props.clearCart()}>
                  <Text style={{ color: 'white' }}>Clear</Text>
                </EasyButton>
              </HStack>
              <HStack>
                {context.stateUser.isAuthenticated ? (
                  <EasyButton
                    primary
                    medium
                    onPress={() => props.navigation.navigate('Checkout')}
                  >
                    <Text style={{ color: 'white' }}>Checkout</Text>
                  </EasyButton>
                ) : (
                  <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate('Login')}
                  >
                    <Text style={{ color: 'white' }}>Login</Text>
                  </EasyButton>
                )}
              </HStack>
            </HStack>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Your cart is empty</Text>
          <Text>Get started, add to cart</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eacda3',
    top: 50,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#556270',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 20,
  },
  price: {
    fontSize: 15,
    margin: 20,
    color: '#F2F2F2',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
