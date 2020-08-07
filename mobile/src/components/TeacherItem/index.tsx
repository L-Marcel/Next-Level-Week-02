import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import style from './style';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface TeacherItemProps extends BasicTeacherItemProps{
    favorited: boolean;
}

export interface BasicTeacherItemProps {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
    const [isFavorited, setIsFavorited] = useState(props.favorited);

    function handleLinkToWhatsapp(){
        api.post('/connections', {
            user_id: props.user_id
        });

        Linking.openURL(`whatsapp://send?phone=${props.whatsapp}`);
    }

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');
            
        let favoritesArray = [];

        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited){
            const favoriteIndex = await favoritesArray.findIndex(function(item: BasicTeacherItemProps){
                return item.id === props.id;
            });
            console.log('true');
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        }else{
            const teacher = {
                id: props.id,
                subject: props.subject,
                cost: props.cost,
                user_id: props.user_id,
                name: props.name,
                avatar: props.avatar,
                whatsapp: props.whatsapp,
                bio: props.bio,
            }

            favoritesArray.push(teacher);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return(
        <View style={style.container}>
            <View style={style.profile}>
                <Image 
                    style={style.avatar}
                    source={{ uri: props.avatar}}
                />

                <View style={style.profileInfo}>
                    <Text style={style.name}>
                        {props.name}
                    </Text>
                    <Text style={style.subject}>
                        {props.subject}
                    </Text>
                </View>
            </View>

            <Text style={style.bio}>
                {props.bio}
            </Text>

            <View style={style.footer}>
                <Text style={style.price}>
                    Preço/hora {'   '}
                    <Text style={style.priceValue}>R${props.cost}</Text>
                </Text>

                <View style={style.buttonsContainer}>
                    <RectButton 
                        style={[style.favoriteButton, isFavorited? style.favorited:{}]}
                        onPress={handleToggleFavorite}
                    >
                        { !isFavorited? <Image source={heartOutlineIcon}/>
                        :<Image source={unfavoriteIcon}/> }
                    </RectButton>
                    <RectButton style={style.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon}/>
                        <Text style={style.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
};

export default TeacherItem;