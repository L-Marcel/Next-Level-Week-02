import React from 'react';

import './style.css';

import whatsIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

interface TeacherItemProps {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

function handleChangeConnection(user_id: number){
    api.post('/connections', {
        user_id
    });
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
    return(
        <article className="teacher-item">
            <header>
                <img src={props.avatar} alt=""/>
                <div>
                    <strong>{props.name}</strong>
                    <span>{props.subject}</span>
                </div>
            </header>
            <p>
                {props.bio}
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {props.cost}</strong>
                </p>
                <a
                    href={`https://wa.me/${props.whatsapp}`} 
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => { handleChangeConnection(props.user_id) }}>
                    <img src={whatsIcon} alt=""/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;