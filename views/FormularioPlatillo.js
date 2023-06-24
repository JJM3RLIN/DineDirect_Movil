import React, { useState, useContext, useEffect } from "react";
import { Alert, Text, View, Pressable, Image, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";

import PedidoContext from "../context/pedidos/pedidosContext";
import NavBar from "../components/ui/NavBar";


const FormularioPlatillo = ({navigation}) => {
  // state para cantidades
  const [cantidad, setGuardarCantidad] = useState(1);
  const [total, setGuardarTotal] = useState(0);

  // context
  const { platillo, guardarPedido } = useContext(PedidoContext);
  const { precio, imagen, nombre } = platillo;

  // redireccionar
  //const navigation = useNavigation();

  // En cuanto el componente carga, calcular la cantidad a pagar
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  // Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setGuardarTotal(totalPagar);
  };

  // Decrementa en uno
  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setGuardarCantidad(nuevaCantidad);
    }
  };

  // incrementa en uno la cantidad
  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setGuardarCantidad(nuevaCantidad);
  };

  // Confirma si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      "¿Deseas confirmar tu pedido?",
      "Un pedido confirmado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };

            // console.log(pedido);
            guardarPedido(pedido);

            // Navegar hacia el Resumen
            navigation.navigate("ResumenPedido");
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={globalStyles.contenedor}>
      <Image 
      style={globalStyles.imagen}
      source={{uri:imagen}}
      />
      <View style={globalStyles.contenido}>
      <Text style={[globalStyles.heading, {marginVertical: 15}]}>{nombre}</Text>
        <Text style={styles.textoCantidad}>Selecciona una cantidad:</Text>
        <View style={styles.contenedorCantidad}>
        <Pressable 
        style={[styles.botones, {borderBottomLeftRadius: 10, borderTopLeftRadius:10}]}
        onPress={decrementarUno}
        >
          <Text style={styles.botonestexto}>-</Text>
        </Pressable>
        <Text style={styles.cantidad}>{cantidad}</Text>
        <Pressable 
        style={[styles.botones, {borderBottomRightRadius: 10, borderTopRightRadius:10}]}
        onPress={incrementarUno}
        >
          <Text style={styles.botonestexto}>+</Text>
        </Pressable>
        </View>
        <View style={globalStyles.contendorPrecio}>
          <Text style={[globalStyles.colorTexto, globalStyles.textoPrecioChico]}>Subtotal:</Text>
          <Text style={[globalStyles.colorTexto, globalStyles.textoPrecioGrande]}>${total}</Text>
        </View>
        <Pressable style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
          </Pressable>
      </View>
      <NavBar pagina={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorCantidad:{
    alignSelf:'center',
    flexDirection: 'row',
    marginVertical:25
  },
  textoCantidad:{
    color: '#FFF', 
    fontSize: 19,
    alignSelf:'center'
  },
  cantidad:{
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 35,
    textAlign: 'center',
    fontSize: 30,
    color:'#000'
  },

  //Botones de aumento y decremento
  botones:{
    backgroundColor: '#ACAAAA'
  },
  botonestexto:{
    color:'#000',
    fontSize: 30,
    paddingVertical: 10,
    paddingHorizontal: 35
  }
})
export default FormularioPlatillo;
