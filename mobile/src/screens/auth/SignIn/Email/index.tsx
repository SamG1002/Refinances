import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Boundaries,
  Content,
  Input,
  Writting,
  Error,
} from './styles';
import { colors, fonts, metrics } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

// Function
import { isValid } from '../../../../helpers/verifyEmail';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Email'>;
  route: RouteProp<RootStackParamAuth, 'Email'>;
};

const Email = ({ navigation }: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user, updateUserProps, emailExists } = UseAuth();

  // useEffect(() => {
  //   console.debug('Name | SetUser(): ', user);
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  const backAction = () => {
    navigation.goBack();
    const newUser = user;
    newUser.email = '';
    updateUserProps(newUser);
    return true;
  };

  async function setUser() {
    if (email == '') {
      setError(true);
      setErrorMessage('Preencha este campo!');
      return;
    }
    if (!isValid(email)) {
      setError(true);
      setErrorMessage('E-mail inválido, tente novamente!');
      return;
    }
    console.log(await emailExists(email));
    if (await emailExists(email)) {
      setError(true);
      setErrorMessage('E-mail já cadastrado!');
      return;
    }

    const newUser = user;
    newUser.email = email;
    updateUserProps(newUser);
    console.debug('Email | SetUser(): ', user);
    //navigation.navigate('Password');
  }

  return (
    <Container>
      <Header onBackButton={() => backAction()} title="Qual seu e-mail?" />
      <Content>
        <Boundaries>
          <Writting>
            <Input
              placeholder="Email@exemplo.com"
              placeholderTextColor={'rgba(52, 52, 52, .3)'}
              selectionColor={colors.davysGrey}
              keyboardType="default"
              autoCapitalize="words"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError(false);
              }}
            />
            {email.length > 0 && (
              <IonIcons
                style={{ marginLeft: 32 }}
                name="close"
                size={32}
                color={`rgba(82, 82, 82, .08)`}
                onPress={() => setEmail('')}
              />
            )}
          </Writting>
          {hasError && <Error>{errorMessage}</Error>}
        </Boundaries>
      </Content>
      <BottomNavigation onPress={() => setUser()} description="Próximo" />
    </Container>
  );
};

export default Email;
