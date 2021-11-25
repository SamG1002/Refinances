import { Conta } from '@contexts/AccountContext';
import { Parcela } from '../../../../../contexts/InstallmentContext';

import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {toDate} from '../../../../../helpers/manipularDatas'

import PickerContas from '../PickerContas'

import {Checkbox} from 'react-native-paper'

import {
    ContainerCardParcela,
    InputCardParcela,
    LabelCardParcela,
    TituloCardParcela,
    InputControlStatus,
    LabelStatus
} from './styles'


export type CardParcelaProps = {
    item: Parcela;
    dataParcelas: Parcela[];
    setDataParcelas: React.Dispatch<React.SetStateAction<Parcela[]>>;
    tipoLancamento: string;
}

const ItemCardParcela = ({item, dataParcelas, setDataParcelas, tipoLancamento}: CardParcelaProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.debug("Veio no handleConfirm")
        const aux = item
        aux.dataParcela = date
        dataParcelas[item.indexOfLancamento] = aux
        setDataParcelas(dataParcelas)
        hideDatePicker();
    };

    const onChangeValor = (text: string) => {
        console.debug("Veio no onChangeValor")
        const aux = dataParcelas.slice()
        aux[item.indexOfLancamento].valorParcela = text == '' ? NaN : parseFloat(text)
        
        console.log(aux)
        setDataParcelas(aux)                
    }

    function changeSituation() {
        console.debug("Veio no onChangeValor")        

        const aux = dataParcelas.slice()
        aux[item.indexOfLancamento].statusParcela = aux[item.indexOfLancamento].statusParcela ? false : true

        setDataParcelas(aux)
    }

    function changeAccount(conta: Conta | null){        
        if(item.contaParcela?.descricao != conta?.descricao) {
            const aux = dataParcelas.slice()
            aux[item.indexOfLancamento].contaParcela = conta        
            
            console.log(aux)
            setDataParcelas(aux)
        }
    }
    
                
    return (
        <ContainerCardParcela style={{borderColor: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}}>
            <TituloCardParcela onPress={showDatePicker}>Parcela de {item.dataParcela.toLocaleDateString()}</TituloCardParcela>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <InputCardParcela 
                keyboardType="numeric" 
                placeholder="R$ 00,00" 
                placeholderTextColor="gray"
                value={isNaN(dataParcelas[item.indexOfLancamento].valorParcela) ? '' : String(dataParcelas[item.indexOfLancamento].valorParcela)}
                onChangeText={onChangeValor}
            />
            <InputControlStatus>
                <Checkbox 
                    status={dataParcelas[item.indexOfLancamento].statusParcela ? 'checked' : 'unchecked'}
                    onPress={changeSituation}
                    color={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
                />
                <LabelStatus style={{color: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}}>{tipoLancamento == 'despesa' ? 'Pago' : 'Recebido'}</LabelStatus>
            </InputControlStatus>
            <PickerContas conta={dataParcelas[item.indexOfLancamento].contaParcela} changeAccount={changeAccount} tipoLancamento={tipoLancamento}/>
        </ContainerCardParcela>

    )
}

export default ItemCardParcela