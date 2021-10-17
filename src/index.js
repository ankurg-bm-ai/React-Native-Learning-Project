/**
 * @format
 */

import React from 'react';
import {Navigation} from 'react-native-navigation';
import {store} from './app/store';
import {Provider} from 'react-redux';

import BillScreen from './features/Bill';
import CalculatorScreen from './features/Calculator';
import Loading from './features/Loading';
import {
  NativeBaseProvider,
  extendTheme,
  View,
  Button,
  Text,
  Box,
  Center,
} from 'native-base';

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};

const theme = extendTheme({
  colors: newColorTheme,
  components: {
    Input: {
      baseStyle: {
        margin: '2.5',
      },
    },
    Button: {
      baseStyle: {
        margin: '2.5',
      },
    },
  },
});

const BillScreenRedux = () => (
  <NativeBaseProvider theme={theme}>
    <Provider store={store}>
      <BillScreen />
    </Provider>
  </NativeBaseProvider>
);

BillScreenRedux.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
    icon: require('../home.png'),
  },
};

const CalculatorScreenRedux = () => (
  <NativeBaseProvider theme={theme}>
    <Provider store={store}>
      <CalculatorScreen />
    </Provider>
  </NativeBaseProvider>
);

CalculatorScreenRedux.options = {
  topBar: {
    title: {
      text: 'Calculator',
    },
  },
  bottomTab: {
    text: 'Calculator',
    icon: require('../calculator.png'),
  },
};

const LoginScreen = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Bills Management Application</Text>
        <Button
          color="#710ce3"
          onPress={async () => {
            Navigation.setRoot(mainRoot);
          }}>
          Enter the Application
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};

const LoadingScreen = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Loading />
      </Center>
    </NativeBaseProvider>
  );
};

Navigation.registerComponent('Loading', () => LoadingScreen);
Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Home', () => BillScreenRedux);
Navigation.registerComponent('Calculator', () => CalculatorScreenRedux);

const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Home',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Calculator',
                },
              },
            ],
          },
        },
      ],
    },
  },
};

const loginRoot = {
  root: {
    component: {
      name: 'Login',
    },
  },
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 20,
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(loginRoot);
});
