import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import style from './style';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { BasicTeacherItemProps } from '../../components/TeacherItem';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


const TeacherList = () => {
    const [isFiltersVisible, setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teacher, setTeachers] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('favorites').then(function(res){
            if(res){
                const _favorites = JSON.parse(res);
                const _favoritesId = _favorites.map(function(item: BasicTeacherItemProps){
                    return(item.id);
                });
                setFavorites(_favoritesId);
            }
        });

        if(subject !== "" && time !== "" && week_day !== ""){
            api.get('/classes', {
                params: {
                    week_day: Number(week_day),
                    time,
                    subject
                }
            }).then(function(res){
                setTeachers(res.data);
            });
        }else {
            api.get('/classes', {
                params: {
                    week_day: Number(week_day),
                    time,
                    subject
                }
            }).then(function(res){
                setTeachers(res.data);
            });
        }
    }, [subject, week_day, time]);

    function handleToggleFiltersVisible(){
        setIsFilterVisible(!isFiltersVisible);
    }

    return(
        <View style={style.container}>
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" color="#fff" size={24}/>
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={style.searchForm}>
                        <Text style={style.label}>Matéria</Text>
                        <TextInput
                            placeholderTextColor="#c1bccc"
                            style={style.input}
                            placeholder="Qual a matéria?"
                            value={subject}
                            onChangeText={(text) => {setSubject(text)}}
                        />


                        <View style={style.inputGroup}>
                            <View style={style.inputBlock}>
                                <Text style={style.label}>Dia da semana</Text>
                                <TextInput 
                                    placeholderTextColor="#c1bccc"
                                    style={style.input}
                                    placeholder="Qual o dia?"
                                    value={week_day}
                                    onChangeText={(text) => {setWeekDay(text)}}
                                />
                            </View>
                            <View style={style.inputBlock}>
                                <Text style={style.label}>Horário</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={style.input}
                                    placeholder="Qual o horário?"
                                    value={time}
                                    onChangeText={(text) => {setTime(text)}}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </PageHeader>
            <ScrollView 
                style={style.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teacher.map(function(item: BasicTeacherItemProps, index){
                    return(
                        <TeacherItem 
                            key={index}
                            favorited={favorites.includes(item.id)}
                            {...item}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;