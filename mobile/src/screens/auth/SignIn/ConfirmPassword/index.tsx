import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, StatusBar, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, Input, Writting, Error } from './styles';
import { colors } from '../../../../styles';

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'ConfirmPassword'>;
  route: RouteProp<RootStackParamAuth, 'ConfirmPassword'>;
};

const ConfirmPassword = ({ navigation }: PropsNavigation) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [securePassword, setSecurePassword] = useState(true);

  const { user, showNiceToast, hideNiceToast } = UseAuth();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Password'));
    return true;
  };

  async function next() {
    if (confirmPassword == '') {
      // setError(true);
      // setErrorMessage('Preencha este campo!');
      showNiceToast('error', 'Confirme a senha primeiro!');
      return;
    }
    if (confirmPassword != user.senhaUsuario) {
      // setError(true);
      // setErrorMessage('As senhas não batem!');
      showNiceToast('error', 'As senhas não batem!');
      return;
    }
    hideNiceToast();
    console.debug('ConfirmPassword | next(): ', user);
    navigation.dispatch(StackActions.replace('Photo'));
  }
  const theme: any = useTheme();
  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Header onBackButton={() => backAction()} title="Confirme sua senha" />
      <Content onPress={() => inputRef.current?.focus()} activeOpacity={1}>
        <Writting>
          <Input
            placeholder="Confirme aqui"
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={theme.colors.davysGrey}
            value={confirmPassword}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={securePassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setError(false);
            }}
            ref={inputRef}
            autoFocus
          />
          {confirmPassword.length > 0 && (
            <>
              <IonIcons
                style={{
                  padding: 6,
                  marginLeft: 32,
                }}
                name="close"
                size={32}
                color={`rgba(82, 82, 82, .08)`}
                onPress={() => {
                  setConfirmPassword('');
                  setSecurePassword(true);
                  setError(false);
                }}
              />
              <Feather
                style={{
                  padding: 6,
                  marginLeft: 8,
                }}
                name={securePassword ? 'eye' : 'eye-off'}
                size={28}
                color={`rgba(82, 82, 82, .08)`}
                onPress={() => setSecurePassword(!securePassword)}
              />
            </>
          )}
        </Writting>
        {hasError && <Error>{errorMessage}</Error>}
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />
    </Container>
  );
};

export default ConfirmPassword;
