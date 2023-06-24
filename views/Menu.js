import React, { useContext, useEffect, Fragment } from 'react';
import {Text, View, FlatList,StyleSheet } from 'react-native'
import globalStyles from '../styles/global';
import CardPlatillos from '../components/ui/CardPlatillos';
import NavBar from '../components/ui/NavBar';
import  FirebaseContext from '../context/firebase/firebaseContext';



const Menu = () => {

    // Context de Firebase 
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) => {
        if(i > 0 ) {
            const categoriaAnterior = menu[i - 1].categoria;
            if(categoriaAnterior !== categoria) {
                return (
                    
                        <Text style={styles.separadorTexto}> {categoria} </Text>
                  
                )
            }
        } else {
            return (
                
                    <Text style={styles.separadorTexto}> {categoria} </Text>
                
            )
        }
    }

    return ( 
    
            
        <View style={globalStyles.contenedor}>
            <FlatList 
            style={globalStyles.contenido}
            data={menu}
            keyExtractor={item=>item.id}
            renderItem={({item})=>{
               const {categoria, id} = item
                return (
                    <Fragment key={id}>
                        {mostrarHeading(categoria, menu.findIndex(e=>e.id == id) ) }
                        <CardPlatillos item={item} />
                    </Fragment>
        
                )
            }}
            />
        <NavBar pagina={3} />
        </View>
           
        
     );
}

const styles = StyleSheet.create({

    separadorTexto: {
        color: '#FFF',
        fontWeight: '400',
        textTransform: 'uppercase',
        fontSize:18,
        marginVertical: 15
    },
  
})
 
export default Menu;