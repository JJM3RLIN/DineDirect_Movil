import React, {useContext, useEffect} from 'react';
import { View, Text, ScrollView ,StyleSheet } from 'react-native';
import globalStyles from '../styles/global';
import NavBar from '../components/ui/NavBar';
import CardPlatillos from '../components/ui/CardPlatillos';
import UsuariosContext from '../context/usuarios/usuariosContext'
const NuevaOrden = () => {
    const { usuario, platillosRecomendados, obtenerPlatillosRecom } = useContext(UsuariosContext);

   useEffect(()=>{
    //Obtener Recomendaciones
   obtenerPlatillosRecom()
   }, [])
    return ( 

        <View style={globalStyles.contenedor}>
            <Text style={styles.saludo}>Bienvenido <Text style={{fontWeight:'bold'}}>{usuario.nombre}</Text></Text>
            <View style={[globalStyles.contenido, styles.contenido]}>
                <Text style={[globalStyles.colorTexto, globalStyles.textoBold, {fontSize:25,marginVertical:15}]}>Nuestras reconmendaciones para ti</Text>
                {
                    platillosRecomendados.length>0 ? (
                        <ScrollView>
                        {
                            platillosRecomendados.map((platillo, i)=>(
                                <CardPlatillos key={i} item={platillo} />
                            ))
                        }
                    </ScrollView>
                    ):
                    (
                        <Text  style={[globalStyles.colorTexto, globalStyles.textoBold, {fontSize:20}]}>Ups!, al parecer aún no has comprado, para tener recomendaciones debes hacer una compra</Text>
                    )
                }

            </View>
            <NavBar pagina={1} />
        </View>

     );
}

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column'
    },
    saludo:{
        color: '#FFF',
        fontSize: 25,
        marginLeft: 15,
        marginTop: 15

    }
})
 
export default NuevaOrden;