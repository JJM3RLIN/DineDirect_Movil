import React, {  useContext, useEffect, useState } from 'react';
import {View, Text, Image, Pressable, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import NavBar from '../components/ui/NavBar';
import globalStyles from '../styles/global';
import firebase from '../firebase';
import PedidoContext from '../context/pedidos/pedidosContext';
import UsuariosContext from '../context/usuarios/usuariosContext';

const ResumenPedido = ({navigation}) => {

   const [cargando, setCargando] = useState(false)
   //const { initStripe, createPaymentMethod, confirmPaymentIntent } = useStripe();

    // context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);
    const {usuario,obtenerPlatillosRecom} = useContext(UsuariosContext)
    
    //console.log(pedido)
    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal)

    }

   /* const hacer_pago = async()=>{
        const paymentMethod = await createPaymentMethod({
            type: 'Card',
            billingDetails: {
              name: 'John Doe',
              email: 'johndoe@example.com'
            }
        })
        const response = await fetch('http://192.168.0.10:8000/metodoPago', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              paymentMethodId: paymentMethod.id,
            })
          })
          const result = await response.json();

          if (result) {
            setPaymentIntent(result.paymentIntent);
            Alert.alert('Success', 'Payment successful!');
          } else {
            Alert.alert('Error', result.error);
          }
        
    }
*/
    // redirecciona a Progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        setCargando(true)
                        // crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        }
                        
                        //Obtener solo el nombre de los ingredientes de los platillos pedidos
                        const nombresIngredientes = pedido.reduce((pedidos, productoA)=>{
                            //Enviando cada ingrediente por separado
                            return [...pedidos, ...productoA.Ingredientes.split(', ').map(i=>i.toLowerCase())]
                        },[])

                        //Eliminando repeticiones en los ingredientes->ingrdienets del nuevo pedido
                       const ingredienetsNoRepe = [...new Set(nombresIngredientes)]
                        
                        //Hacer array del string de ingredientes de los pedidos que ya se habian realizado
                        const usuarioIngBD = usuario.pedidos.split(',')
                       
                        //Verificando si hay o no platillos pedidos por el usuario    
                       if(!usuarioIngBD.includes("")){
                            //Verificar que aun no este ese ingrediente en los del usuario
                            //Agregando los que ya tiene el usuario
                          let platillosActualizados =  [...usuarioIngBD]
                          ingredienetsNoRepe.forEach(platillo =>{
                            if (!usuarioIngBD.includes(platillo)) platillosActualizados = [...platillosActualizados,platillo]
                        })
                        
                        //Volviendolos string
                        usuario.pedidos = platillosActualizados.join(',')
                        }
                        //Primer pedido
                        else{
                            console.log('es el primero')
                            usuario.pedidos = ingredienetsNoRepe.join(',')
                        }
                      
                        //Obtener coleccion para saber en donde actualizar                           
                        let idCollecionUsuario = ''
                              await   firebase.db.collection('usuarios')
                                                .where('email', '==', usuario.email)
                                                .get().then((querySnapshot) => {
                                                        //Verificando que si exista en la coleccion
                                                        if (!querySnapshot.empty) {
                                                                //Id del usuario en la coleccion
                                                            idCollecionUsuario = querySnapshot.docs[0].id;
                                                            
                                                        }
                                                  })         
                        //Hacer actualizacion al usuario
                       const actualizacion = await  firebase.db.collection('usuarios').doc(idCollecionUsuario)
                        actualizacion.update({
                           'pedidos': usuario.pedidos
                        }).then(()=>{
                           console.log('actualizado correctamente')
                        }).catch(error=>console.log('error'))
            
                        //Actualizar recomendaciones
                        obtenerPlatillosRecom()
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            setCargando(false)
                            // redireccionar a progreso
                            navigation.navigate("ProgresoPedido")
                        } catch (error) {
                            console.log(error);
                        }


                      
                    }
                }, 
                { text: 'Revisar', style: 'cancel'}
            ]
        )
    }

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                    }
                }, 
                { text: 'Cancelar', style: 'cancel'}
            ]
        )
    }

    return ( 
        <View style={globalStyles.contenedor}>          
            <View style={globalStyles.contenido}>
             <View>  
                <Text style={[globalStyles.heading, {alignSelf:'center', marginVertical:15}]}>Resumen Pedido</Text>
                <FlatList 
                data={pedido}
                keyExtractor={item=>item.id}
                renderItem={({item})=>{
                    const { cantidad, nombre, imagen, id, precio } = item;
                    return (
                        <View style={styles.cardPedido}> 
                            <Image 
                            source={{ uri: imagen}} 
                            style={{width:100, height:100 }}
                            />
                                
                                
                                    <View >
                                    <Text style={[globalStyles.colorTexto, styles.texto]}>{nombre} </Text>

                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:20}}>

                                    <View>
                                    <Text style={[globalStyles.colorTexto, styles.texto]}><Text style={globalStyles.textoBold}>Cantidad:</Text> {cantidad} </Text>
                                    <Text style={[globalStyles.colorTexto, styles.texto]}><Text style={globalStyles.textoBold}>Precio:</Text> ${precio} </Text>
                                    </View>
                                    
                                    <Pressable
                                        onPress={ () => confirmarEliminacion(id) }
                                        style={[globalStyles.boton,{backgroundColor:'#7B1D1D', margin:0, paddingHorizontal:29}]}
                                    >
                                        <Text style={[globalStyles.colorTexto,{ fontSize:16}]}>Eliminar</Text>
                                    </Pressable>
                                    </View>
                                    </View>       
                        </View>
                    )
                }}
                />
                
                <View style={globalStyles.contendorPrecio}>
                    <Text style={[globalStyles.colorTexto, globalStyles.textoPrecioChico]}>Total a Pagar:</Text>
                    <Text style={[globalStyles.colorTexto, globalStyles.textoPrecioGrande]}>${total}</Text>
                </View>

               {
                cargando ? (<ActivityIndicator size={70} color="#1D4F7B"/>):
                (
                <View>
                    <Pressable
                        onPress={ () => navigation.navigate('Menu') }
                        style={[globalStyles.boton, {backgroundColor: '#6E6E6E'}]}
                    >
                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Seguir Pidiendo</Text>
                    </Pressable>
                    <Pressable
                        onPress={ () => progresoPedido()  }
                        style={[globalStyles.boton ]}
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Pressable> 
                </View>
                )
               }   
                </View>   
            </View>       
            <NavBar pagina={3} />          
        </View>
     );
}
 const styles = StyleSheet.create({
    cardPedido:{
        flexDirection: 'row',
        gap:15,
        marginBottom:20
    },
    texto:{
        fontSize: 19,
        marginBottom:10
    },
    //Estilos para el metodo de pago
    cardPago:{
        width:'100%',
        height:50,
        marginVertical:20
    }
 })
export default ResumenPedido;