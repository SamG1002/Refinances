import styled from "styled-components/native"

import fonts from "../../../../../styles/fonts"

export const Title = styled.Text `
    marginBottom: 2%;
    marginTop: 15%;
    fontSize: ${`${fonts.size.super}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.black}`};
    textAlign: center;
`

export const Valor = styled.View`
    flexDirection: row;
    flex: 1;
    width: 100%;
    justifyContent: center;
`

export const TextRS = styled.Text`
    textAlign: center;
    fontFamily: ${`${fonts.familyType.regular}`};
`

export const TextValor = styled.Text`
    fontFamily: ${`${fonts.familyType.black}`};
    fontSize: ${`${fonts.size.super}px`};
    textAlign: center;
    color: #525252
`

export const DaysLeft = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    fontSize: ${`${fonts.size.medium}px`};
    margin-bottom: 10px;
    opacity: 0.5
`

export const TextProgress = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    textAlign: center; 
    fontSize: ${`${fonts.size.medium}px`}
    color: #525252;
    margin-top: 10
    margin-bottom: 10
`

export const TextGoals = styled.Text`
    fontSize: ${`${fonts.size.medium}px`}
    color: #292929;
    fontFamily: ${`${fonts.familyType.bold}`};
`

export const GoalDate = styled.View`
    flexDirection: row;
    width: 100%;
    paddingBottom: 1%;
`
export const BtnGroup = styled.View`
    flexDirection: row;
    width: 100%;
    justifyContent: center;
    align-items: center
`
export const TextGoalsH = styled.Text`
    fontSize: ${`${fonts.size.medium}px`}
    color: #525252;
    fontFamily: ${`${fonts.familyType.bold}`};
    width: 50%;
`

export const TextGoalsLighter = styled.Text`
    fontSize: ${`${fonts.size.medium}px`}
    color: #525252;
    textAlign: right;
    fontFamily: ${`${fonts.familyType.bold}`};
    width: 50%;
    opacity: 0.85;
`

