import React, {useState} from 'react'
import { View, Text, TextInput, Pressable, Alert} from 'react-native'
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import firebase from '../firebase'
import globalStyles from '../styles/global'
const CrearCuenta = ({navigation}) => {
 
  const [nUsuario, setNuevoUsuario] = useState({
                                                email:'',
                                                nombre:'',
                                                password:'', 
                                                rPassword: ''
                                                  })
  const handle_submit = async ()=>{
    if(Object.values(nUsuario).includes('')){
      Alert.alert('Todos los campos son obligatorios', 'Por favor llena los campos para crear tu cuenta')
      return
    }
    if(nUsuario.password !== nUsuario.rPassword){
      Alert.alert('Las contraseñas no son iguales', 'Vuelve a escribir las contraseñas')
      return
    }
    //Verifica si ya existe un usuario con el mismo correo
   const correoExistente = await verificar_correo() 
   if(correoExistente){
    Alert.alert("Correo usado en otra cuenta", 'Este correo ya es usado en otra cuenta por favor introduce otro')
    return
   }
  
    //Sacar la rPassword
    try{
      const {rPassword, ...user} = nUsuario
      const randomId = Math.random().toString(36).slice(2, 9);
      const id = `${Date.now().toString()}-${randomId}`;
      firebase.db.collection('usuarios').add({...user, id, pedidos:''})
      Alert.alert('Cuenta creada exitosamente', 'Inicia sesión para poder hacer tus pedidos.\n Bienvenido')
      setTimeout(()=>{
                navigation.navigate('InicioSesion')
      }, 1500)
    }catch(erro){
      Alert.alert('Ocurrio un error al guardar al usuario', 'Este es un error en la abse de datos, favor de intentarlo mas tarde')
    }

  }
  const verificar_correo =async()=>{
    let existe
     //Verificar si el correo no existe
    await firebase.db.collection('usuarios')
     .where('email', '==', nUsuario.email).get()
     .then((querySnapshot)=>{
      //Verificando que el usuario exista
      if (!querySnapshot.empty) {
        existe = true
     }else{
       existe = false
     }
     }).catch((error) => {
      console.log(error)
    });
    return existe
  }
  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.centrar, {justifyContent:'center'}]}>

        <Text style={[globalStyles.heading, {fontSize:35}]}>Crear Cuenta</Text>

        <View style={globalStyles.contenedorDatos}>
          <Text style={globalStyles.textoLabel}> Correo electrónico</Text>
          <TextInput 
          style={globalStyles.input}  
          onChangeText={email=> setNuevoUsuario({...nUsuario, email})}
          />
        </View>

        <View style={globalStyles.contenedorDatos}>
          <Text style={globalStyles.textoLabel}>Nombre</Text>
          <TextInput 
          style={globalStyles.input}  
          onChangeText={nombre=> setNuevoUsuario({...nUsuario, nombre})}
          />
        </View>

        <View style={globalStyles.contenedorDatos}>
          <Text style={globalStyles.textoLabel}> Contraseña</Text>
          <TextInput 
          secureTextEntry={true} 
          style={globalStyles.input}  
          onChangeText={password=> setNuevoUsuario({...nUsuario, password})}
          />
        </View>

        <View style={globalStyles.contenedorDatos}>
          <Text style={globalStyles.textoLabel}>Confirmar contraseña</Text>
          <TextInput 
          secureTextEntry={true} 
          style={globalStyles.input} 
          onChangeText={rPassword=> setNuevoUsuario({...nUsuario, rPassword})}
           />
        </View>
        <View style={globalStyles.contenedorDatos}>
          <Text style={globalStyles.textoLabel}>Datos de tarjeta</Text>
            <CardField 
            cardStyle={{
              borderRadius:20
            }}
            postalCodeEnabled={false}
            style={[globalStyles.input, {height:50}]} 
            />
        </View>
            <Pressable 
            style={globalStyles.boton}
            onPress={handle_submit}
            >
              <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
            </Pressable>
      </View>
    </View>
  )
}

export default CrearCuenta