import React, {useContext} from 'react';
import {Text, Pressable} from 'react-native'
import globalStyles from '../../styles/global';
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {

    const navigation = useNavigation();

    // Leer el objeto de pedido
    const { pedido } = useContext(PedidoContext);

    if(pedido.length === 0) return null;

    return ( 
        <Pressable 
            onPress={ () => navigation.navigate("ResumenPedido") }
        >
            <Text style={[globalStyles.colorTexto, {textTransform: "uppercase", fontWeight: "bold", marginRight:13}]}>Ir a Pedido</Text>
        </Pressable>
     );
}
 
export default BotonResumen;