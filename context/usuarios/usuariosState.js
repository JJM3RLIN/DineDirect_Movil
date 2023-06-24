import React, { useReducer } from 'react';

import UsuarioReducer from './usuariosReducer';
import UsuariosContext from './usuariosContext';

import {SELECCIONAR_USUARIO, ACTUALIZAR_RECOMENDADOS,ACTUALIZAR_INGS} from '../../types'
import firebase from '../../firebase';
const UsuarioState = props => {

    // Crear state inicial
    const initialState = {
      usuario:{},
      platillosRecomendados:[]
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(UsuarioReducer, initialState);


    // Selecciona el usuario 
    const guardarUsuario = usuario => {
        dispatch({
            type: SELECCIONAR_USUARIO,
            payload: usuario
        })
    }
    const actualizarRecomendados = recom => {
        dispatch({
            type: ACTUALIZAR_RECOMENDADOS,
            payload: recom
        })
    }
    //Generar las recomendaciones
    const obtenerPlatillosRecom = async ()=>{
        //Platillos del menu
        const platillos = []
         // consultar firebase para ver los productos
        await firebase.db.collection('productos')
         .where('existencia', '==', true).get()
         .then((querySnapshot)=>{
          querySnapshot.forEach((doc) => {
             platillos.push(doc.data())
            })
         }) .catch((error) => {
          console.log(error)
        });
       generarRecomendaciones(platillos)
       }
       
       //Generar recomendaciones en base al menu
       const generarRecomendaciones = (platillos) => {
        // Obtener todos los ingredientes de los platillos seleccionados
        const ingredientesUsuario = state.usuario.pedidos.split(',')
        // Filtrar los platillos del menú que contengan al menos un ingrediente de los seleccionados
        const nuevasRecomendaciones = platillos.filter((platillo) => {
          //Primero separamos los ingredeintes y despues verificamos
          return platillo.Ingredientes.split(', ').map(ing=>ing.toLowerCase()).some((ingrediente) => ingredientesUsuario.includes(ingrediente));
        });
        //Hacerlos aleatorios, obteniendo index aleatorios en base a la longitud
        const indexAleatorios = []
        for (let i = 0; i < nuevasRecomendaciones.length; i++) {
            indexAleatorios.push(Math.floor(Math.random()*(nuevasRecomendaciones.length-1))+1) 
        }
        const indexSinRepetir = [...new Set(indexAleatorios)]
        const recomendacionesAleatorias = indexSinRepetir.reduce((acum, actual)=>{
            return [...acum, nuevasRecomendaciones[actual]]
        },[])
        if (recomendacionesAleatorias.length > 5)
        actualizarRecomendados(recomendacionesAleatorias.slice(0,5))
        else actualizarRecomendados(recomendacionesAleatorias)
      }

    return (
        <UsuariosContext.Provider
            value={{
                usuario: state.usuario,
                guardarUsuario,
                platillosRecomendados: state.platillosRecomendados,
                actualizarRecomendados,
                obtenerPlatillosRecom
            }}
        >
            {props.children}
        </UsuariosContext.Provider>
    )
}

export default UsuarioState;