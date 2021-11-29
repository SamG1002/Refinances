import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { toDate } from '../../../../../helpers/manipularDatas';
import { colors, fonts, metrics } from '../../../../../styles';

import { ProgressBar, Colors } from 'react-native-paper';

import Button from '../../../../../components/Button';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import {
  Container,
  TopSection,
  Detail,
  Description,
  Title,
  Separator,
  GoalsContainer,
} from './styles';

import GoalItem from '../../../../../components/GoalItem';

import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { UseMetas } from '../../../../../contexts/GoalsContext';
import { StackActions } from '@react-navigation/native';
import shadowBox from '../../../../../helpers/shadowBox';

const GoalsCard = () => {
  const { navigation } = UseDadosTemp();
  const { metas, handleReadByUserMetas } = UseMetas();

  return (
    <Container style={shadowBox(30, 0.3)}>
      <TopSection>
        <Detail />
        <Description>Gerencie suas metas acompanhe seus avanços.</Description>
      </TopSection>

      <Separator />
      <Title>Minhas metas</Title>

      <GoalsContainer>
        {metas &&
          metas.map((item, index) => {
            if (index < 1) {
              return <GoalItem item={item} key={index} />;
            }
          })}
      </GoalsContainer>

      <Button
        style={{ backgroundColor: colors.lightGray }}
        onPress={() =>
          navigation.dispatch(
            StackActions.replace('GoalsStack', { screen: 'GoalList' }),
          )
        }
        title="Gerenciar"
        color={colors.silver}
        lastOne
      />
    </Container>
  );
};

export default GoalsCard;