import { View, Text,Image, TextInput,Modal, TouchableOpacity, ScrollView} from 'react-native'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { getImage } from '../utils/images';
import { API_KEY } from '@env';
import { addtoCurrencyList, addCurrencyData, selectCurrency, selectCurrencyData } from '../features/currencySlice';

const CurrencyScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [currency, setCurrency] = useState('SGD');
  const [currencyImagePath,setCurrencyImagePath] = useState({path: getImage('SGD')});
  const [convertedCurrency, setConvertedCurrency] = useState('USD');
  const [convertedCurrencyImagePath,setConvertedCurrencyImagePath] = useState({path: getImage('USD')}) 
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [convertedCurrencyModalVisible, setConvertedCurrencyModalVisible] = useState(false);
  const [exchangeRate, setExchangeRate] = useState()
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [convertedCurrencyAmount, setConvertedCurrencyAmount] = useState(0);

  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrency); 
  const currencyData = useSelector(selectCurrencyData);

  useEffect(() => {
    setCurrencyImagePath({
      path: getImage(currency)
    });
  },[currency]);

  useEffect(()=>{
    setConvertedCurrencyImagePath({
      path: getImage(convertedCurrency)
    });
  },[convertedCurrency]);

  useEffect(() => {

    let length=currencies.length;
    let index=null;
    for(let i=0; i<currencies.length; i++){
       if(currencies.length==0){
        length=0;
       }
       else if(currencies[i] === currency) {
        index = i
       }
    }

    if(index != null){
      setConvertedCurrencyAmount(currencyAmount * currencyData[index][String(convertedCurrency)].value.toFixed(5));
      setExchangeRate(currencyData[index][String(convertedCurrency)].value.toFixed(5));
    }
    else{
      fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${currency}`)
      .then(res => res.json())
      .then(data => {
        dispatch(addtoCurrencyList(currency));
        dispatch(addCurrencyData(data.data));
        setConvertedCurrencyAmount(currencyAmount * data.data[String(convertedCurrency)].value.toFixed(5));
        setExchangeRate(1 * data.data[String(convertedCurrency)].value.toFixed(5));
      })
    }
  },[currency, currencyAmount, convertedCurrency]);


  
  return(
<View>

    <Modal animationType="fade" transparent={true} visible={currencyModalVisible}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', height:'50%',}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Select Currency</Text>

        <ScrollView>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('SGD'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/SGD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>SGD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('USD'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/USD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>USD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('EUR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/EUR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>EUR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('IRR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/IRR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>IRR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('CNY'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/CNY.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>CNY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('GBP'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/GBP.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>GBP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('SAR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/SAR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>SAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('AED'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/AED.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>AED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('AUD'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/AUD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>AUD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('COP'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/COP.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>COP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('CAD'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/CAD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>CAD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('BRL'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/BRL.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>BRL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('IDR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/IDR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>IDR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('ILS'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/ILS.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>ILS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('INR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/INR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>INR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('MXN'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/MXN.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>MXN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('NZD'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/NZD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>NZD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('PHP'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/PHP.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>PHP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('PKR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/PKR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>PKR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('QAR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/QAR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>QAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('RUB'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/RUB.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>RUB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setCurrency('ZAR'); setCurrencyModalVisible(!currencyModalVisible)}}>
          <Image source={require('../assets/ZAR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>ZAR</Text>
        </TouchableOpacity>
        </ScrollView>
        </View>
      </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={convertedCurrencyModalVisible}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', height:'50%'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Select Currency</Text>
        <ScrollView>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('SGD'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/SGD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>SGD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('USD'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/USD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>USD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('EUR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/EUR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>EUR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('IRR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/IRR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>IRR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('CNY'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/CNY.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>CNY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('GBP'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/GBP.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>GBP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('SAR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/SAR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>SAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('AED'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/AED.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>AED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('AUD'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/AUD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>AUD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('COP'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/COP.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>COP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('CAD'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/CAD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>CAD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('BRL'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/BRL.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>BRL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('SGD'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/SGD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>IDR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('ILS'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/ILS.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>ILS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('INR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/INR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>INR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('MXN'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/MXN.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>MXN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('NZD'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/NZD.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>NZD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('PHP'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/PHP.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>PHP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('PKR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/PKR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>PKR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('QAR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/QAR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>QAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('RUB'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/RUB.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>RUB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={()=>{setConvertedCurrency('ZAR'); setConvertedCurrencyModalVisible(!convertedCurrencyModalVisible)}}>
          <Image source={require('../assets/ZAR.png')} style={{width: 30, height: 30, borderRadius: 15}} />
          <Text style={{fontSize: 18, marginLeft: 10}}>ZAR</Text>
        </TouchableOpacity>

        </ScrollView>
        </View>
      </View>
        </Modal>

  

      <View className='flex items-center text-center mt-10'>
      <Text className="text-2xl font-extrabold text-[#1F2261] ">Currency Converter</Text>
      <Text className='mt-2 px-10 text-[#808080] text-base text-center '>Check live rates, set rate alerts, receive notifications and more.</Text>
      </View>

      {/* <View className='w-20 h-20 mt-5 bg-red-500 self-center'>
       <TouchableWithoutFeedback onPress={startAnimation}>
       <Animated.View style={[{width:50, height:50, backgroundColor:'#26278D'}, animationStyle]} />
       </TouchableWithoutFeedback>
      </View> */}

      <View className='bg-white mx-8 my-10 rounded-xl py-4'>

        <View>
        <Text className='text-sm text-gray-400 mt-2 pl-6'>Amount</Text>
        <View className='flex flex-row items-center mt-3 px-6'>
        <Image 
        source={currencyImagePath.path}
        className='flex h-10 w-10 rounded-full bg-slate-100'
        />
        <Text className='text-lg font-bold text-[#26278D] ml-6 mr-2' onPress={()=>{setCurrencyModalVisible(true)}}>{currency}</Text>
        <FontAwesome5 name="angle-down" size={15} color="#B6B6B6" onPress={()=>{setCurrencyModalVisible(true)}}/>
        <TextInput
        className='text-base font-extrabold ml-6 w-32 h-10 px-4 rounded-lg text-gray-700 bg-[#EFEFEF] '
        onChangeText={setCurrencyAmount}
        keyboardType='numeric'
        value={String(currencyAmount)}
        placeholder='0'
      />
        </View>
        </View>

      <View className=' mt-8'>
        <View className='w-full'>
        <View className='mx-5' style={{ borderColor: "#E0E0E0", borderBottomWidth: 1, }} />
        </View>
        <View className='flex top-[-20px] items-center'>
        <MaterialIcons  onPress={()=>{
          setClicked(!clicked); 
          setCurrencyAmount(convertedCurrencyAmount);
          setConvertedCurrencyAmount(currencyAmount);
          setCurrency(convertedCurrency);
          setConvertedCurrency(currency);
          }} name="swap-vert-circle" size={40} color="#26278D"/> 
        </View>
      </View>


        <View>
        <Text className='text-sm text-gray-400 mt-[-6px] pl-6'>Converted Amount</Text>
        <View className='flex flex-row items-center mt-3 px-6'>
        <Image source={convertedCurrencyImagePath.path} className='h-10 w-10 rounded-full bg-slate-100' />
        <Text className='text-lg font-bold text-[#26278D] ml-6 mr-2 ' onPress={()=>{setConvertedCurrencyModalVisible(true)}}>{convertedCurrency}</Text>
        <FontAwesome5 name="angle-down" size={15} color="#B6B6B6" onPress={()=>{setConvertedCurrencyModalVisible(true)}}/>
        <TextInput
        className='text-base font-extrabold ml-6 w-32 h-10 px-4 rounded-lg text-gray-700 bg-[#EFEFEF]'
        placeholder={String(convertedCurrencyAmount)}
        keyboardType='numeric'
        editable={false}
      />
        </View>
        </View>

      </View>

      <View className='mx-6'>
      <Text className='text-sm text-gray-400 mt-2 pl-4'>Indicative Exchange Rate</Text>
      <Text className='text-black font-bold text-lg ml-4 mt-2'>1 {currency} = {exchangeRate}  {convertedCurrency}</Text>
      </View>

    </View>
  )
}

export default CurrencyScreen