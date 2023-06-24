import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import globalStyles from '../styles/global';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';
import preparando from '../src/imgs/preparando.png'
import ordenLista from '../src/imgs/ordenlista.png'
const ProgresoPedido = ({navigation}) => {

    //const navigation = useNavigation();

    const { idpedido } = useContext(PedidoContext);

    const [ tiempo, guardarTiempo] = useState(0);
    const [ completado, guardarCompletado] = useState(false);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes')
                        .doc(idpedido)
                        .onSnapshot(function(doc) {
                            guardarTiempo(doc.data().tiempoentrega);
                            guardarCompletado(doc.data().completado)
                        })
        }
        obtenerProducto()
    }, []);

    // Muestra el countdown en la pantalla
    const renderer = ({minutes, seconds}) => {
        return (
            <Text style={styles.tiempo}>{minutes}:{seconds} </Text>
        )
    }

    return ( 
         <View style={globalStyles.contenedor}>
             <View style={[ globalStyles.contenido, globalStyles.centrar ,{ marginTop: 50} ]}>
                { tiempo === 0 && (
                    <>
                        <Text style={[globalStyles.colorTexto,globalStyles.heading,{ textAlign: 'center'}]}>Recibimos tu orden</Text>
                        <Text style={[globalStyles.colorTexto,{ textAlign: 'center', fontWeight:'400', fontSize:20}]}>Estamos calculando el tiempo aproximado de entrega de tu pedido...</Text>
                        <Image 
                        source={preparando}
                        alt='Icono-preparando-orden'
                        />
                    </>
                ) }

                { !completado && tiempo > 0 && (
                    <>
                    <Text style={[globalStyles.colorTexto,globalStyles.heading,{ textAlign: 'center'}]}>Preparando tu orden</Text>
                        <Text style={[globalStyles.colorTexto,{ textAlign: 'center', fontWeight:'400', fontSize:20, marginBottom:45}]}>Tu orden estará lista en:  </Text>
                        <Text style={[globalStyles.colorTexto,{ textAlign: 'center'}]}>
                            <Countdown
                                date={ Date.now() + tiempo * 60000 }
                                renderer={renderer}
                            />
                        </Text>
                        <Image 
                        source={preparando}
                        alt='Icono-preparando-orden'
                        />
                    </>
                )} 

                { completado && (
                    <>
                        <Text style={[globalStyles.colorTexto,globalStyles.heading,{ textAlign: 'center'}]}>Orden lista</Text>
                        <Text style={[globalStyles.colorTexto,{ textAlign: 'center', fontWeight:'400', fontSize:20, marginBottom:45}]}>Por favor, pase a recoger su pedido con id:<Text style={globalStyles.textoBold}>{idpedido}</Text></Text>
                        <Image 
                        source={ordenLista}
                        alt='Icono-orden-lista'
                        />
                        <Pressable style={[ globalStyles.boton, { marginTop: 100,width:'100%',paddingVertical:15}]}
                            onPress={ () => navigation.navigate("NuevaOrden") }
                        >
                            <Text style={globalStyles.botonTexto}>Comenzar Una Orden Nueva</Text>
                        </Pressable>

                    </>
                ) }
             </View>
         </View>
     );
}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 80,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    },
    imagen:{
        width: 40,
        height:40
    }
})
 
export default ProgresoPedido;