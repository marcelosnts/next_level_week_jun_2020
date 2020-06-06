import React, {useState, useEffect} from 'react';
import {View, Image, ImageBackground, StyleSheet, Text, TextInput} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Feather as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface RNPicker{
	label : string;
	value : string;
}
interface IBGEUFResponse {
	sigla : string;
}

interface IBGECityResponse {
    nome : string;
}

const Home = () => {
    const navigation = useNavigation();
	const [ufs, setUfs] = useState <RNPicker[]> ([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [cities, setCities] = useState <RNPicker[]> ([]);
    const [selectedCity, setSelectedCity] = useState('0');

	useEffect( () => {
        axios.get <IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => ({
				label : uf.sigla,
				value : uf.sigla
			}));

            setUfs(ufInitials);
        });
    }, []);

	useEffect(() => {
        if(selectedUf === '0'){
            return;
        }
		
        axios.get <IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => ({
				label : city.nome,
				value : city.nome
			}));

            setCities(cityNames);
        });
    }, [selectedUf]);

    function handleNavigationToPoints(){
        navigation.navigate('Points', {uf : selectedUf, city : selectedCity});
    }

	function handleSelectedUf(uf : string){
		setSelectedUf(uf);
	}

	function handleSelectedCity(city : string){
		setSelectedCity(city);
	}
    
    return (
        <ImageBackground 
            style={styles.container} 
            source={require('../../assets/home-background.png')}
            imageStyle={{width : 274, height : 368}}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}></Image>   
                <Text style={styles.title}>Seu marketplace de coleta de resíduos!</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
            </View>
            <View style={styles.footer}>
				<RNPickerSelect
					onValueChange={value => handleSelectedUf(value)}
					items={ufs}
					placeholder={{
						label : 'Selecione o estado', 
						value : null
					}}
				/>

				<RNPickerSelect
					onValueChange={value => handleSelectedCity(value)}
					items={cities}
					placeholder={{
						label : 'Selecione a cidade', 
						value : null
					}}
				/>	

                <RectButton style={styles.button} onPress={handleNavigationToPoints}> 
                    <View style={styles.buttonIcon}>
                        <Icon name="arrow-right" color="#FFF" size={24}/>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;