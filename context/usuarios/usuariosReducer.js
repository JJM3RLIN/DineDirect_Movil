import {
    SELECCIONAR_USUARIO,
    ACTUALIZAR_RECOMENDADOS
} from '../../types'

export default (state,action) => {
    switch (action.type) {
        case SELECCIONAR_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }
        case ACTUALIZAR_RECOMENDADOS:
            return{
                ...state,
                platillosRecomendados: action.payload
            }
        default:
            return state;
    }
}