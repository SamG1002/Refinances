import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${colors.diffWhite};
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${`${metrics.default.boundaries}px`};
`;

export const Writting = styled.View`
  margin-top: 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
  flex: 1;
`;

export const Error = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.redCrayola};
  padding: 5px;
  opacity: 0.3;
`;