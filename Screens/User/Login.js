import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate('User Profile');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === '' || password === '') {
      setError('Please fill in your credentials');
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Sign In'}>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Enter Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <EasyButton large primary onPress={() => handleSubmit()}>
            <Text style={{ color: '#414345', fontWeight: 'bold' }}>LOGIN</Text>
          </EasyButton>
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Text style={styles.middleText}>Don't have an account yet?</Text>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate('Register')}
          >
            <Text style={{ color: '#414345', fontWeight: 'bold' }}>
              SIGN UP
            </Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
    color: '#93291E',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});

export default Login;
