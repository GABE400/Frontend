import React, { useState } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { HStack, Stack, Divider} from 'native-base';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { Avatar } from 'react-native-elements';




const CartItem = (props) => {
  const data = props.item.item;

  return (
    <ListItem style={styles.listItem} key={Math.random()}>
      <HStack style={styles.left}>
        <Avatar
          source={{
            uri: data.image
              ? data.image
              : 'https://cdn.pixabay.com/photo/2016/03/05/20/02/sandwich-1238615_960_720.jpg',
          }}
        />
      </HStack>
      <Stack style={styles.body}>
        <HStack>
          <Text style={{ color: '#5A3F37' }}>{data.name}</Text>
        </HStack>
        <HStack>
          <Text style={{ color: '#2C7744' }}> ZMK{data.price}</Text>
        </HStack>
      </Stack>
    </ListItem>
  );
};

const styles = StyleSheet.create({
 
  listItem: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 70,
   
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '75%',
    height: 70,
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 24,
    justifyContent: 'space-between',
  },
  left: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  }
});

export default CartItem;
