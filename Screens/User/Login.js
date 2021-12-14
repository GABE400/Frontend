import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';
import { ActivityIndicator } from 'react-native-paper';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

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

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientID: `206416718609-dio3qrm6thf6qo0hg1amvhs19l9o7j6n.apps.googleusercontent.com`,
      androidClientId: `206416718609-471f4234gf01b9ofvp012njf3pasdjb4.apps.googleusercontent.com`,
      scopes: ['Profile', 'email'],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          handleMessage('Google signin was successful', 'SUCCESS');
          setTimeout(
            () =>
              props.navigation.navigate('UserProfile', {
                email,
                name,
                photoUrl,
              }),
            1000
          );
        } else {
          handleMessage('Google signin was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('An error occured. Check network and try again');
        setGoogleSubmitting(false);
      });
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
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          {!googleSubmitting && (
            <EasyButton
              large
              primary
              google={true}
              onPress={() => handleGoogleSignin()}
            >
              <Text
                google={true}
                style={{ color: '#414345', fontWeight: 'bold' }}
              >
                Sign in with
              </Text>
              <Entypo name='google--with-circle' size={30} color='#000046' />
            </EasyButton>
          )}
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
});

export default Login;
