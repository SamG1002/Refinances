import React, { Ref, useEffect, useRef, useState } from 'react';

import { BackHandler, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { Conta } from '../../../../contexts/AccountContext';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import AccountItem from '../../../../components/AccountItem';
import AccountsPlaceholder from '../../components/AccountsPlaceholder';
import InputText from '../../../../components/InputText';
import Modalize from '../../../../components/Modalize';
import { useTheme } from 'styled-components/native'; 
import { Modalize as Modal } from 'react-native-modalize';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Account'>;
  route: RouteProp<RootStackParamAuth, 'Account'>;
};

const Account = ({ navigation }: PropsNavigation) => {
  const [walletAmount, setWalletAmount] = useState<number | null>(0);
  const [isLoading, setLoading] = useState(true);

  const {
    user,
    updateSetupUserProps,
    setupUser,
    showNiceToast,
    hideNiceToast,
  } = UseAuth();

  const walletModalizeRef = useRef<Modal>(null);
  const newAccountModalizeRef = useRef<Modal>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    // Carteira
    if (setupUser.accounts == undefined) {
      const walletAccount = {
        tipo: 'carteira',
        descricao: 'Carteira',
        saldoConta: 0,
        instituicao: null,
      } as Conta;

      const newSetupProps = setupUser;
      newSetupProps.accounts = [walletAccount];
      updateSetupUserProps(newSetupProps);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    setWalletAmount(setupUser.accounts[0].saldoConta);
  }, [setupUser.accounts, isLoading]);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Photo'));
    return true;
  };

  async function next() {
    if (setupUser.accounts.length < 2)
      return showNiceToast(
        'error',
        'Calma ✋',
        'Adicione uma conta além da carteira!',
      );

    hideNiceToast();
    console.debug('Photo | next(): ', JSON.stringify(user).substr(0, 200));
    navigation.dispatch(StackActions.replace('FixedExpenses'));
  }

  const openModalize = (ref: any) => ref.current?.open();
  const closeModalize = (ref: any) => ref.current?.close();
  const theme: any = useTheme()

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Minhas contas"
        subtitle="Agora, além da carteira, vamos configurar sua conta principal. Todo o processo seguinte será atrelado à essa conta."
      />
      <Content>
        {!isLoading ? (
          <>
            {setupUser.accounts.map((acc: Conta, index: number) => (
              <View style={{ elevation: 0 }} key={index}>
                <AccountItem
                  account={acc}
                  onPress={() => {
                    index == 0
                      ? openModalize(walletModalizeRef)
                      : navigation.dispatch(
                          StackActions.replace('InteractWithAccount', {
                            accountIndex: index,
                          }),
                        );
                  }}
                />
              </View>
            ))}
            {setupUser.accounts.length < 2 && (
              <Button
                style={{ backgroundColor: theme.colors.platinum }}
                title="Nova conta principal"
                color={theme.colors.silver}
                onPress={() => openModalize(newAccountModalizeRef)}
              />
            )}
          </>
        ) : (
          <AccountsPlaceholder
            moreThanOne={
              setupUser.accounts != undefined && setupUser.accounts.length > 1
            }
          />
        )}
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />

      {/* 💰💵👀🎣🐟 */}
      <Modalize
        ref={walletModalizeRef}
        title="Minha carteira 👀"
        subtitle="Seu dinheiro físico. Quanto tem na sua carteira agora?"
        backgroundColor={theme.colors.cultured}
        hasBodyBoundaries>
        <InputText
          label="Quanto tem?"
          isCurrencyInput
          // @ts-ignore
          value={walletAmount}
          onChangeValue={(amt: number) => setWalletAmount(amt)}
          onChangeText={() => {
            if (walletAmount == null) setWalletAmount(0.0);
          }}
        />
        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Atualizar"
          onPress={() => {
            setLoading(true);

            const newSetupProps = setupUser;
            newSetupProps.accounts[0].saldoConta = walletAmount || 0;
            updateSetupUserProps(newSetupProps);

            closeModalize(walletModalizeRef);
          }}
          color={theme.colors.silver}
          lastOne
        />
      </Modalize>

      <Modalize
        ref={newAccountModalizeRef}
        title="Escolha o tipo da conta"
        backgroundColor={theme.colors.cultured}
        hasBodyBoundaries>
        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Conta Poupança"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('InteractWithAccount', {
                accountType: 'conta poupança',
              }),
            )
          }
          color={theme.colors.silver}
          lastOne
        />

        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Conta Corrente"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('InteractWithAccount', {
                accountType: 'conta corrente',
              }),
            )
          }
          color={theme.colors.silver}
        />

        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Outro"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('InteractWithAccount', {
                accountType: 'outro',
              }),
            )
          }
          color={theme.colors.silver}
          lastOne
        />
      </Modalize>
    </Container>
  );
};

export default Account;
