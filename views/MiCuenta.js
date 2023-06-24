import React, {useContext} from 'react'
import {Text, View, Pressable, StyleSheet} from 'react-native'
import UsuariosContext from '../context/usuarios/usuariosContext'
import globalStyles from '../styles/global'
import NavBar from '../components/ui/NavBar'
const MiCuenta = ({navigation}) => {
    const {usuario, guardarUsuario } = useContext(UsuariosContext);
    //const navigation = useNavigation();
    const cerrar_sesion = ()=>{
        //Limpiar al usuario guardado
        guardarUsuario({})
        //Redireccionar al Login
        navigation.navigate('InicioSesion')
    }
  return (
    <View style={globalStyles.contenedor}>
      <View style={globalStyles.centrar}>
      <Text style={[globalStyles.heading,{marginVertical:40}]}>Mi cuenta</Text>
        <Text style={[globalStyles.colorTexto, styles.textoInfo]}><Text style={globalStyles.textoBold}>ID:{' '}</Text>{usuario.id}</Text>
        <Text style={[globalStyles.colorTexto, styles.textoInfo]}><Text style={globalStyles.textoBold}>Nombre:{' '}</Text>{usuario.nombre}</Text>
        <Text style={[globalStyles.colorTexto, styles.textoInfo]}><Text style={globalStyles.textoBold}>Correo:{' '}</Text>{usuario.email}</Text>
        <Pressable
         style={[globalStyles.boton, {backgroundColor: '#7B1D1D', marginTop:30}]}
         onPress={cerrar_sesion}
         >
            <Text style={globalStyles.botonTexto}>Cerrar sesión</Text>
        </Pressable>
      </View>
        <NavBar pagina={4}/>
    </View>
  )
}
const styles = StyleSheet.create({
  textoInfo:{
    fontSize:25,
    marginBottom:20,
    alignSelf:'flex-start'
  }
})
export default MiCuenta