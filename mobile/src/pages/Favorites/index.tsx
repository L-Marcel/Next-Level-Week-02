import React, { useState, useEffect } from 'react';
import { View, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import style from './style';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { BasicTeacherItemProps } from '../../components/TeacherItem';
import api from '../../services/api';


const Favorites = () => {
    const [favorites, setFavorites] = useState<BasicTeacherItemProps[]>([]);

    useFocusEffect(() => {
        AsyncStorage.getItem('favorites').then(function(res){
            if(res){
                const _favorites = JSON.parse(res);
                setFavorites(_favorites);
            }
        });
    });

    return(
        <View style={style.container}>
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
                style={style.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map(function(item: BasicTeacherItemProps, index){
                    return(
                        <TeacherItem 
                            key={index}
                            favorited
                            {...item}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;