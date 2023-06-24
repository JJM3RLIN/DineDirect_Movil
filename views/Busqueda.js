import React, {useContext, useEffect, useState} from 'react'
import {Text, TextInput, View, ScrollView } from 'react-native'
import CardPlatillos from '../components/ui/CardPlatillos'
import NavBar from '../components/ui/NavBar'
import globalStyles from '../styles/global'

import FirebaseContext from '../context/firebase/firebaseContext'
const Busqueda = () => {
   const {menu, obtenerProductos} = useContext(FirebaseContext)
    const [platillos, setPlatillos] = useState([])
    const [textoBarra, setTextoBarra] = useState('')
    const [mensaje, setMensaje] = useState(false)
    useEffect(()=>{
        obtenerProductos()  
    }, [])
    useEffect(()=>{ 
        if(textoBarra==''){
            setPlatillos([])
        }
        else{
            const platillosEncontrados = menu.filter(p=>p.nombre.toLowerCase().includes(textoBarra))
            if(platillosEncontrados.length == 0) {
                setMensaje(true)
                setPlatillos(platillosEncontrados)
            }
            else{
                setPlatillos(platillosEncontrados)
                setMensaje(false)
            }
        }
  
    }, [textoBarra])
  return (
    <View style={globalStyles.contenedor}>
        <View style={globalStyles.contenido}>
        <TextInput 
        style={[globalStyles.input, {marginVertical:16}]}
        placeholder='Busca tu comida favorita'
        placeholderTextColor={'#666'}
        onChangeText={txt=>setTextoBarra(txt.trim().toLowerCase())}
        />
        {
            mensaje && (
                <Text style={[globalStyles.heading]}>Ups!, al parecer no contamos con ese platillo</Text>
            )
        }
        
        <ScrollView>
            {
                platillos.map(pl=>(
                    <CardPlatillos item={pl} key={pl.id} />
                ))
            }
        </ScrollView>
  
        </View>
        <NavBar pagina={2} />
    </View>
  )
}

export default Busqueda