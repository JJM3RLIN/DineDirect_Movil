import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider} from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InicioSesion from './views/InicioSesion';
import CrearCuenta from './views/CrearCuenta';
import RecuperarPass from './views/RecuperarPass';
import MiCuenta from './views/MiCuenta';
import Menu from './views/Menu';
import Busqueda from './views/Busqueda';
import NuevaOrden from './views/NuevaOrden';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

// Components
import BotonResumen from './components/ui/BotonResumen';

// importar state de context
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState';
import UsuariosState from './context/usuarios/usuariosState'

import { StripeProvider } from '@stripe/stripe-react-native';
const Stack = createStackNavigator();

const App = () => {
  return (
    <StripeProvider apiKey={'pk_test_51NKuqmFDY0qrlkxtmg1GDN87zm9EsDhECGLUMdRLAEZvR6jiz8u508WITV6AuevliQ0qSt0sTRvu9VMz7yZzolvh00ERVbTzTA'}>
      <FirebaseState>
        <PedidoState>
          <UsuariosState>
          <NavigationContainer>
          <NativeBaseProvider>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#252525',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: "#FFF"
                },
                headerTintColor: '#000',
              }}>
                 <Stack.Screen
                name="InicioSesion"
                component={InicioSesion}
                options={{
                  title: 'Iniciar sesión',
                }}
              />

              <Stack.Screen
                name="CrearCuenta"
                component={CrearCuenta}
                options={{
                  title: 'Crea tu cuenta',
                }}
              />
              <Stack.Screen
                name="RecuperarPassword"
                component={RecuperarPass}
                options={{
                  title: 'Recupera tu contraseña',
                }}
              />
               <Stack.Screen
                name="MiCuenta"
                component={MiCuenta}
                options={{
                  title: 'Información de tu cuenta',
                }}
              />
                <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden',
                }}
              />
                <Stack.Screen
                name="Busqueda"
                component={Busqueda}
                options={{
                  title: 'Busca un platillo',
                }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: 'Nuestro Menú',
                  headerRight: props => <BotonResumen />,
                }}
              />

              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: 'Detalle Platillo',
                }}
              />

              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: 'Ordenar Platillo',
                }}
              />

              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: 'Resumen Pedido',
                }}
              />

              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: 'Progreso de Pedido',
                }}
              />
            
            </Stack.Navigator>
             </NativeBaseProvider>
          </NavigationContainer>
          </UsuariosState>
        </PedidoState>
      </FirebaseState>
    </StripeProvider>
  );
};

export default App;
