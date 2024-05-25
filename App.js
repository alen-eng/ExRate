import {SafeAreaView, Text, View } from 'react-native';
import CurrencyScreen from './Screen/CurrencyScreen';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView className="mt-5 h-full bg-[#F1F6F7]">
      <CurrencyScreen/>
    </SafeAreaView>
    </Provider>
  );
}

