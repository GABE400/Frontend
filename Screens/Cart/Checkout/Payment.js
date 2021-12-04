import React, { useState } from 'react';
import { View, Button } from 'react-native';
import {
  Container,
  HStack,
  Stack,
  Box,
  Text,
  Radio,
  Icon,
  Select,
} from 'native-base';

const methods = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
];

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <Container>
      <HStack>
        <Text>Choose your payment method</Text>
      </HStack>
      <Box>
        {methods.map((item, index) => {
          return (
            <Stack key={item.name} onPress={() => setSelected(item.value)}>
              <HStack>
                <Text>{item.name}</Text>
              </HStack>
              <HStack>
                <Radio.Group selected={selected == item.value} />
              </HStack>
            </Stack>
          );
        })}
        {selected == 3 ? (
          <Select
            mode='dropdown'
            iosIcon={<Icon name={'arrow-down'} />}
            headerStyle={{ backgroundColor: 'orange' }}
            headerBackButtonTextStyle={{ color: '#fff' }}
            headerTitleStyle={{ color: '#fff' }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((c, index) => {
              return <Select.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Select>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: 'center' }}>
          <Button
            title={'Confirm'}
            onPress={() => props.navigation.navigate('Confirm', { order })}
          />
        </View>
      </Box>
    </Container>
  );
};

export default Payment;
