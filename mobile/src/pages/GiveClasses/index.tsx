import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import style from './style';

import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';


const GiveClasses = () => {
    const navigation = useNavigation();

    function handleNavigateGoBack(){
        navigation.goBack();
    }

    return(
        <View style={style.container}>
            <ImageBackground resizeMode="contain" source={giveClassesBgImg} style={style.content}>
                <Text style={style.title}>Quer ser um Proffy?</Text>
                <Text style={style.description}>
                    Para começar você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton style={style.okButton} onPress={handleNavigateGoBack}> 
                <Text style={style.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;