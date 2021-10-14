import React, { useEffect, useState, useRef } from 'react'
import {Alert, TextInput} from 'react-native'
import {CategoriaConta, UseCategoriasConta} from '../../../../../../../contexts/CategoriesAccountContext'

import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario'

import {Searchbar} from 'react-native-paper'

import Icon from '../../../../../../../helpers/gerarIconePelaString'
import InputText from '../../../../../../../components/InputText'

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

import {HomeAccountStack} from '../../../../../../../@types/RootStackParamApp'

import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings
} from 'react-native-custom-picker'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'




const RenderOption = (settings: OptionTemplateSettings) => {
    const { item, getLabel } = settings
    return (
        <ContainerItem>
            <Icon size={24} stringIcon={'Entypo:wallet'} color={'red'}/>
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
    navigation: StackNavigationProp<HomeAccountStack, "CreateAccount">,    
    
}

const RenderFooter = ({navigation}: PropsRenderFooter) => {    
    return (
        <BotaoAdicionarCategoria>
            <LabelAdicionarCategoria onPress={() => navigation.navigate('AddCategoryAccount')}>Adicionar Categoria</LabelAdicionarCategoria>
        </BotaoAdicionarCategoria>
    )
}


type PropsSelectionCategorias = {
    setCategoriaConta: React.Dispatch<React.SetStateAction<string>>,
    navigation: StackNavigationProp<HomeAccountStack, "CreateAccount">,    
    categoriaConta: string
}

const SelectionCategoriesAccount = ({categoriaConta, setCategoriaConta, navigation}: PropsSelectionCategorias) => {        
    const {categoriasConta, handleReadByUserCategoriesAccount} = UseCategoriasConta()    

    const [search, setSearch] = useState('') 
    const [categoriasAtual, setCategoriasAtual] = useState([] as CategoriaConta[])
    
    const PickerRef = useRef<CustomPicker>(null)

    useEffect(() => {
        async function loadCategorias() {            
            handleReadByUserCategoriesAccount(await retornarIdDoUsuario())
        }

        loadCategorias()
    }, [])

    useEffect(() => {
        setCategoriasAtual(categoriasConta)
    }, [categoriasConta])

    useEffect(() => {
        if(search == '') {
            setCategoriasAtual(categoriasConta)
        } else {
            const aux: CategoriaConta[] = []

            categoriasConta.map((item: CategoriaConta) => {
                if(item.descricaoCategoryConta.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=  -1) {
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
                    label="Categoria"
                    value={categoriaConta == '0' ? '' : categoriaConta}
                    placeholder="Selecione uma categoria conta"
                    placeholderTextColor={"#bbb"}
                    editable={false}
                    showClearIcon={false}
                    onClear={() => {}}
                />

            </TouchableOpacity>

            <CustomPicker 
                ref={PickerRef}
                placeholder={"Selecione a categoria para esse lançamento" }
                options={categoriasAtual}
                getLabel={(item: CategoriaConta) => item.descricaoCategoryConta}
                optionTemplate={RenderOption}
                headerTemplate={() => <RenderHeader search={search} setSearch={setSearch} />}
                footerTemplate={() => <RenderFooter navigation={navigation}/>}                
                maxHeight={400}
                modalStyle={{minHeight: 400}}
                onValueChange={(value: CategoriaConta) => {
                    setCategoriaConta(value.descricaoCategoryConta)
                    
                }}
                style={{display: 'none'}}
            />
            
        </Container>
    )
}

export default SelectionCategoriesAccount