import React, {useState, useEffect, useContext} from 'react'
import firebase from '../firebase'
import UsuariosContext from '../context/usuarios/usuariosContext'
import {View, Text, Pressable, TextInput, Image, StyleSheet, Alert} from 'react-native'
import globalStyles from '../styles/global'
import logo from '../src/imgs/DineDirect_logo.png'
const InicioSesion = ({navigation}) => {

    const { guardarUsuario } = useContext(UsuariosContext);
    const [credenciales, setCredenciales] = useState({email:'', password: ''})
    const [usuarioBd, setUsuarioBd] = useState({})
    useEffect(()=>{
        //Verificar contraseña
        if(Object.keys(usuarioBd).length > 0){
        if(usuarioBd.password == credenciales.password) {
            guardarUsuario(usuarioBd)
            setCredenciales({email:'', password: ''})
            navigation.navigate('NuevaOrden')
        }
        else Alert.alert('Contraseña Incorrecta', 'Por favor vuelve a introducir la contraseña')
        }
    }, [usuarioBd])
    const handle_validar = ()=>{
       if( Object.values(credenciales).includes('')){
//console.log('hola')
        Alert.alert("Todos los datos son necesarios", 'Falta llenar campos')
        return
       }

       //Verificando correo correcto
       firebase.db.collection('usuarios')
       .where('email', '==', credenciales.email).get()
       .then((querySnapshot)=>{
        //Verificando que el usuario exista
        if (!querySnapshot.empty) {
            //Datos del usuario
        setUsuarioBd(querySnapshot.docs[0].data());
        
    }else{
        Alert.alert("El usuario no existe o las credenciales no son validas", 'Por favor vuelve a escribir tus credenciales')
    }
       }) .catch((error) => {
        Alert.alert(error)
      });
     
    }
  return (
    <View style={globalStyles.contenedor}>
        <View style={globalStyles.centrar}>
                    
        <Image
        source={logo}
        style={styles.logo}
        alt='imagen-logo'
        />
        <Text style={[globalStyles.heading, {alignSelf:'flex-start'}]}>Iniciar Sesión</Text>
        <View style={globalStyles.contenedorDatos}>
            <Text style={globalStyles.textoLabel}>Correo electrónico</Text>
            <TextInput 
            style={globalStyles.input}
            placeholder='Ej. correo@correo.com'
            placeholderTextColor={'#666'}
            value={credenciales.email}
            onChangeText={email=> setCredenciales({...credenciales, email})}
            />
        </View>

        <View style={globalStyles.contenedorDatos}>
            <Text style={globalStyles.textoLabel}>Contraseña</Text>
            <TextInput style={globalStyles.input} 
            placeholder='Ingresa tu contraseña'
            secureTextEntry={true}
            placeholderTextColor={'#666'}
            textContentType='password'
            value={credenciales.password}
            onChangeText={password=> setCredenciales({...credenciales, password})}
            />
        </View>
        <Pressable
                    style={globalStyles.boton}
                    onPress={handle_validar}
                >
                    <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
                </Pressable>

        <View style={styles.contenedorAcciones}>

        <View style={styles.acciones}>
            <Text style={[styles.accionesTexto, styles.texto]}>¿No tienes cuenta? </Text> 
            <Pressable
            onPress={()=>navigation.navigate('CrearCuenta')}
            >
                <Text style={[styles.accionesLink, styles.texto]}>Crea una</Text>
            </Pressable>
        
        </View>

        <View style={styles.acciones}>
            <Text style={[styles.accionesTexto, styles.texto]}>¿Olvidaste tu contraseña? </Text> 
            <Pressable
            onPress={()=>navigation.navigate('RecuperarPassword')}
            >
                <Text style={[styles.accionesLink, styles.texto]}>Recupérala aquí</Text>
            </Pressable>
        
        </View>

        </View>

        </View>

    </View>
  )
}
const styles = StyleSheet.create({

    logo:{
        width:160,
        height:160,
        marginVertical: 20
    },
    contenedorAcciones:{
        marginTop:10
    },
    acciones:{
        flexDirection:'row',
        alignSelf:'center',
        marginBottom: 10
    },
    texto:{
        fontSize: 18,
    },
    accionesTexto:{
        color:'#FFF'
    },
    accionesLink:{
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 3
    },


})
export default InicioSesion