import React, { useEffect, useState, useRef } from 'react'
import {Alert, TextInput, View} from 'react-native'
import {Categoria, UseCategories} from '../../../../../contexts/CategoriesContext'


import {Searchbar} from 'react-native-paper'

import Icon from '../../../../../helpers/gerarIconePelaString'
import InputText from '../../../../../components/InputText'

import {
    Container,
    Header,
    Body,
    ListaCategorias,

    ContainerItem,
    NomeItem,
    Separator,

    BotaoAdicionarCategoria,
    LabelAdicionarCategoria
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'

import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings
} from 'react-native-custom-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext'
import { StackActions } from '@react-navigation/native'


type PropsSelectionCategorias = {
    tipoCategoria: string,    
    setCategoria: React.Dispatch<React.SetStateAction<string>>,    
    categoria: string
}

const RenderOption = (settings: OptionTemplateSettings) => {
    const { item, getLabel } = settings

    if(!item.iconeCategoria)
        return (
            <View />
        )

    return (
        <ContainerItem>
            <Icon size={24} stringIcon={item.iconeCategoria} color={'red'}/>
            <NomeItem >{getLabel(item)}</NomeItem>

            <Separator />
        </ContainerItem>
    )
}


type PropsRenderHeader = {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const RenderHeader = ({search, setSearch}: PropsRenderHeader) => {    
    return (
        <Searchbar 
            placeholder="Type Here..."
            onChangeText={setSearch}
            value={search}
        />
    )
}


type PropsRenderFooter = {
    tipoCategoria: string
}

const RenderFooter = ({tipoCategoria}: PropsRenderFooter) => {  
    const {navigation} = UseDadosTemp()
    return (
        <BotaoAdicionarCategoria>
            <LabelAdicionarCategoria onPress={() => navigation.dispatch(StackActions.replace('Lancamentos', {screen: 'AddCategory', params: {tipoCategoria}}))} >Adicionar Categoria</LabelAdicionarCategoria>
        </BotaoAdicionarCategoria>
    )
}



const SelectionCategorias = ({categoria, tipoCategoria, setCategoria}: PropsSelectionCategorias) => {        
    const {categorias, loading, handleReadByUserCategorias} = UseCategories()    

    const [search, setSearch] = useState('') 
    const [categoriasAtual, setCategoriasAtual] = useState([] as Categoria[])
    
    const PickerRef = useRef<CustomPicker>(null)

    useEffect(() => {
        async function loadCategorias() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? '{}' : getUser).id
            handleReadByUserCategorias(idUser, tipoCategoria)
        }

        loadCategorias()
    }, [])

    useEffect(() => {
        if(categorias == null) {
            setCategoriasAtual([])
        } else {
            setCategoriasAtual(categorias)
            setCategoria(categorias[0].nomeCategoria)
        }


    }, [categorias])

    useEffect(() => {
        console.debug('SelectionCategorias | categorias', categorias)
        if(search == '' && categorias) {
            setCategoriasAtual(categorias)
        } else if(categorias) {
            const aux: Categoria[] = []
            
            categorias.map((item, index) => {
                if(item.nomeCategoria.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=  -1) {
                    aux.push(item)
                }
            })

            setCategoriasAtual(aux)
        }
    }, [search])

    const onOpen = () => {
        PickerRef.current?.showOptions()
    }

    
    return (
        <Container>

            <TouchableOpacity onPress={onOpen}>
                <InputText 
                    onClear={() => {}}
                    showClearIcon={false}
                    label="Categoria"
                    value={categoria == '0' ? '' : categoria}
                    placeholder="Selecione uma categoria para seu lançamento"
                    placeholderTextColor={"#bbb"}
                    colorLabel={tipoCategoria == 'despesa' ? '#EE4266' : '#6CB760'} 
                    editable={false}
                />

            </TouchableOpacity>

            <CustomPicker 
                ref={PickerRef}
                placeholder={loading ? "Carregando" : "Selecione a categoria para esse lançamento" }
                options={loading ? [{}] : categoriasAtual}
                getLabel={item => item.nomeCategoria}
                optionTemplate={RenderOption}
                headerTemplate={() => <RenderHeader search={search} setSearch={setSearch} />}
                footerTemplate={() => <RenderFooter tipoCategoria={tipoCategoria}/>}                
                maxHeight={400}
                modalStyle={{minHeight: 400}}
                onValueChange={value => {
                    setCategoria(value.nomeCategoria)
                }}
                style={{display: 'none'}}
            />
{/*             
                

                {loading
                    &&
                    <Text>Carregando</Text>} */}
            
            
        </Container>
    )
}

export default SelectionCategorias