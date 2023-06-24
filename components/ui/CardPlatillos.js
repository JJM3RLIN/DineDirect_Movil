import React, {useContext} from 'react'
import { Pressable, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';
import globalStyles from '../../styles/global';
const CardPlatillos = ({item}) => {
    const { seleccionarPlatillo } = useContext(PedidoContext);
    const { imagen, nombre, descripcion, precio} = item;

    // Hook para redireccionar
    const navigation = useNavigation();
  return (
    <Pressable
    onPress={ () => {

        // Eliminar algunas propiedades del platillo
        const { existencia, ...platillo2 } = item;

        seleccionarPlatillo(platillo2);
        navigation.navigate("DetallePlatillo");
    }}
    style={styles.card} 
>
    <Image 
        source={{ uri: imagen }} 
        style={{width: 120, height: 120, alignSelf: 'center'}}
    />
    <View style={{width:'100%', paddingHorizontal: 2}}>
        <Text style={[globalStyles.colorTexto, {fontWeight:'bold', fontSize: 21, marginVertical: 2}]}>{nombre}</Text>
        <Text 
        style={styles.descripcion}
        numberOfLines={2}
        ellipsizeMode='tail'
        >
            {descripcion}
        </Text>
        <Text style={[globalStyles.colorTexto, {fontWeight: 'bold', marginVertical: 6, fontSize: 20}]}>${precio}</Text>
    </View>
</Pressable>
  )
}
const styles = StyleSheet.create({

    card:{
        backgroundColor:"#2E2E2E",
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
        paddingVertical: 4,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    
    },
    descripcion:{
        color: "#FFF",
        marginVertical: 12,
        fontSize: 16,
        width: '57%'
    }
})
export default CardPlatillos