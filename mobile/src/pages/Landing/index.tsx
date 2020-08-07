import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import style from './style';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/api';

const Landing = () => {
    const navigation = useNavigation();

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(function(res){
            setTotalConnections(res.data.total);
        });
    }, []);


    function handleNavigateToGiveClassesPage(){
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyPage(){
        navigation.navigate('Study');
    }


    return(
        <View style={style.container}>
            <Image source={landingImg} style={style.banner}/>
            <Text style={style.title}>
                Seja bem vindo, {'\n'}
                <Text style={style.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={style.buttonsContainer}>
                <RectButton 
                    style={[style.button, style.buttonPrimary]}
                    onPress={handleNavigateToStudyPage}
                >
                    <Image source={studyIcon}/>
                    <Text style={style.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    style={[style.button, style.buttonSecondary]}
                    onPress={handleNavigateToGiveClassesPage}
                >
                    <Image source={giveClassesIcon}/>
                    <Text style={style.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={style.totalConnections}>
                Todal de {totalConnections} conexões já realizadas. {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;