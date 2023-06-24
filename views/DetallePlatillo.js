import React, { useContext } from 'react';
import { Image, View, Text,Pressable, ScrollView } from 'react-native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';
import NavBar from '../components/ui/NavBar';

const DetallePlatillo = ({navigation}) => {

    // Pedido context
    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio, Ingredientes } = platillo;
    return ( 
        <View style={globalStyles.contenedor}>
            <Image style={globalStyles.imagen} source={{ uri: imagen}} />
            {
                //Card
            }
                <View style={globalStyles.contenido}>
                   
                        <View>
                            <Text style={[globalStyles.heading, {marginVertical: 15}]}>{nombre}</Text>
                            <ScrollView style={{height:120}}>
                            <Text style={[globalStyles.colorTexto, {fontSize:19}]}>{descripcion} </Text>
                            </ScrollView>
                            <Text style={[globalStyles.colorTexto, {fontSize:22, marginTop:10}]}><Text style={globalStyles.textoBold}>Ingredientes:</Text>{Ingredientes}</Text>
                            <Text style={[globalStyles.colorTexto,globalStyles.cantidad]}>${precio}</Text>
                        </View>

                    <Pressable
                        style={[globalStyles.boton, {marginTop:-15}]}
                        onPress={ () => navigation.navigate("FormularioPlatillo") }
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar</Text>
                    </Pressable>
                   
                </View>
           
                
                
          <NavBar pagina={3} />
        </View>
     );
}

export default DetallePlatillo;