import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'

//Navigation
import Navigator from './Navigator';
import { Provider } from 'react-redux';
import store from './redux/Store/index';


const App = () => {
  return (
    <Provider store={store}>

      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        <Navigator />
      </SafeAreaProvider>
      </Provider>
  );
};
export default App;
