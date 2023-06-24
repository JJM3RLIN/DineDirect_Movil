import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        backgroundColor: "#252525",
        flex:1 //Para que tome todo el ancho disponible
        
    },
    colorTexto:{
        color:'#FFF'
    },
    textoBold:{
        fontWeight:'bold'
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1,
    },
    //de inputs
    contenedorDatos:{
        flexDirection:"column",
        marginBottom: 20,
        alignSelf: 'flex-start',
        width: "100%"
    },
    heading:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize: 30,
        marginBottom: 15,
    },
    textoLabel:{
        color: "#FFF", 
        fontWeight: '400' ,
        fontSize: 20,
        textAlign:'left',
        marginBottom: 17
    },
    input:{
        borderColor: '#1D4F7B',
        color:'#000',
        backgroundColor: '#FFF',
        width:"100%",
        padding: 12,
        borderRadius: 15,
        fontSize: 20
    },
    centrar:{
        alignItems:'center',
        flex: 1,
        marginHorizontal: 35
    },
    boton: {
        backgroundColor: '#1D4F7B',
        borderRadius:10,
        alignSelf:'center', 
        paddingHorizontal: 35, 
        paddingVertical: 10, 
        margin: 20
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
        fontSize:17
    },
    contendorPrecio:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center', 
        gap: 10
    },
    textoPrecioChico:{
        fontSize:18
    },
    textoPrecioGrande:{
        fontWeight:'400', 
        fontSize:30
    },
    titulo: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 30
    },
    imagen: {
        height: 320,
        width: '100%'
    },
    cantidad: {
        marginVertical: 20,
        //textAlign: 'center',
        fontSize: 28,
       // fontWeight: 'bold'
    }
})

export default globalStyles;