import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, Modal, StyleSheet } from 'react-native'
import firebase from '../firebase'
import globalStyles from '../styles/global'
const RecuperarPass = () => {
  const [correo, setCorreo] = useState('')
  const [usuario, setUsuario] = useState({})
  const [cargando, setCargando] = useState(false)
  useEffect(()=>{
    //Enviar al servidor el correo
    const enviar_datos = async ()=>{
      setCargando(true)
      //console.log('estamos en el envio de datos')
      const url = 'http://172.100.65.188:8000/enviarEmail'
      const solicitud = await fetch(url, {
        method:'POST',
        body:JSON.stringify(
          {
            password:usuario.password,
            correo: usuario.email
          }
        )
      })
      const respuesta = await solicitud.json()
      setCargando(false)
      Alert.alert(respuesta.respuesta, 'verifica tu bandeja de entrada, ahí encontraras un correo con tu contraseña')
    }
    //envair solo cuandos se tenga el correo
    if(Object.values(usuario).length>0) enviar_datos()
  }, [usuario])
  const handle_submit= ()=>{
    //Verificar que se lleno el campo
    if(correo==''){
      Alert.alert('Escribe tu correo registrado', 'Antes de recuperar tu contraseña necesitamos tu correo')
      return
    }
    //Verificar que el correo este registrado en la bd
        firebase.db.collection('usuarios')
        .where('email', '==', correo).get()
        .then((querySnapshot)=>{
          if (!querySnapshot.empty) {
            //Si existe
            setUsuario(querySnapshot.docs[0].data())
         }else{
          //no existe
          Alert.alert("El usuario no existe", 'Al parecer no existe un usuario registrado con el correo proporcionado')
         }
         }) .catch((error) => {
        Alert.alert("El usuario no existe", 'Al parecer no existe un usuario registrado con el correo proporcionado')
      });
  }
  return (
    <View style={globalStyles.contenedor}>
      <Text style={[globalStyles.heading, {textAlign: 'center', marginTop: 50}]}>Recuperar contraseña</Text>
      <View style={[globalStyles.centrar, {justifyContent: 'center', marginTop: -150}]}>
        
        <View style={globalStyles.contenedorDatos}>
          <Text style={globalStyles.textoLabel}>Correo electrónico</Text>
          <TextInput 
          style={globalStyles.input} 
          placeholder='Ej. correo@correo.com'
          placeholderTextColor={'#666'}
          onChangeText={txt=>setCorreo(txt)}
          />
        </View>
        <Pressable 
        style={globalStyles.boton}
        onPress={handle_submit}
        >
          <Text style={globalStyles.botonTexto}>Recuperar contraseña</Text>
        </Pressable>
        {
          cargando && (
            <Modal animationType='slide' visible={true} transparent={true}>
              <View style={styles.contenidoModal}>
              <Text style={[globalStyles.colorTexto, globalStyles.textoBold, {fontSize:35}]}>Enviando...</Text>
              <ActivityIndicator size={60} color="#1D4F7B"/>
              </View>
            </Modal>
          )
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  contenidoModal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .8)'
  },
})
export default RecuperarPass