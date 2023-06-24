import React, {useState, useEffect} from 'react'
import { View, Image, Pressable ,StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import  cuenta from '../../src/imgs/account.png'
import  inicio from '../../src/imgs/home.png'
import  buscar from '../../src/imgs/search.png'
import  ordenar from '../../src/imgs/order.png'
const NavBar = ({pagina}) => {
    const [seleccionado, setSeleccionado] = useState(0)
    const navigation = useNavigation()  
    useEffect(()=>{
        setSeleccionado(pagina)
    },[])
  return (
    <View style={styles.barra}>
        <Pressable
        onPress={()=>navigation.navigate('NuevaOrden')}
        >
            <Image 
            style={[styles.imagen, seleccionado == 1 && styles.seleccionado]}
            source={inicio} />    
        </Pressable> 
        <Pressable
        onPress={()=>navigation.navigate('Busqueda')}
        >
            <Image 
            style={[styles.imagen, seleccionado == 2 && styles.seleccionado]}
            source={buscar} />    
        </Pressable> 
        <Pressable
        onPress={()=>navigation.navigate('Menu')}
        >
            <Image 
            style={[styles.imagen, seleccionado == 3 && styles.seleccionado]}
            source={ordenar} />    
        </Pressable> 
        <Pressable
        onPress={()=>navigation.navigate('MiCuenta')}
        >
            <Image 
            style={[styles.imagen, seleccionado == 4 && styles.seleccionado]}
            source={cuenta} />    
        </Pressable> 
        
    </View>
  )
}
const styles = StyleSheet.create({
    barra:{
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignContent:'flex-start',
        width:'100%'
    },
    imagen:{
        width:37,
        height:37,
        tintColor:'#FFF'
    },
    seleccionado:{
        tintColor:'#1D4F7B'
    }
})
export default NavBar