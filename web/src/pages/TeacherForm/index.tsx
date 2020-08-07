import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './style.css';
import Textarea from '../../components/Textarea';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface SchedulesItem {
    week_day: number;
    from: string;
    to: string;
}

const TeacherForm = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [schedules, setSchedules] = useState<SchedulesItem[]>(
        [{ week_day: 0, from: "", to:"" }]
    );

    function addNewSchedule() {
        setSchedules([
            ...schedules,
            {
                week_day: 0,
                from: "", 
                to: ""
            }
        ]);
    }

    function removeSchedule(index: number) {
        let _schedules = schedules;
        _schedules.splice(index, 1);
        setSchedules([ ..._schedules ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        let _schedules = schedules.map(function(item, index){
            if(index === position){
                return { ...item, [field]: value};
            }

            return item;
        });
        setSchedules(_schedules);
    }

    async function handleCreateClass(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: schedules
        }).then(function(){
            alert('Cadastro finalizado com sucesso!');
            history.push('/');
        }).catch(function(){
            alert('Erro no cadastro!');
        });
    }

    return(
    <div id="page-teacher-form" className="container">
        <PageHeader 
            title="Que incrivel que você quer da aulas"
            description="O primeiro passo é preencher esse formulário
            de inscrição."
        />

        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input 
                        name="name" 
                        label="Seu nome" 
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar}
                        onChange={(e) => {setAvatar(e.target.value)}}
                    />
                    <Input 
                        name="whatsapp" 
                        label="WhatsApp"
                        value={whatsapp}
                        onChange={(e) => {setWhatsapp(e.target.value)}}
                    />
                    <Textarea 
                        name="bio" 
                        label="Biografia"
                        value={bio}
                        onChange={(e) => {setBio(e.target.value)}}
                    />
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select 
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                        { value: "Artes", label: "Artes"},
                        { value: "Biologia", label: "Biologia"},
                        { value: "Ciências", label: "Ciências"},
                        { value: "Educação Física", label: "Educação Física"},
                        { value: "Física", label: "Física"},
                        { value: "Geografia", label: "Geografia"},
                        { value: "Matemática", label: "Matemática"},
                        { value: "Português", label: "Português"},
                        { value: "Química", label: "Química"}
                    ]}/>
                    <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={(e) => {setCost(e.target.value)}}
                    />
                </fieldset>
                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewSchedule}>
                            + Novo horário
                        </button>
                    </legend>

                    {schedules.map(function(item, index){
                        return(
                            <div key={index} 
                                className={index === 0? "schedule-item":"schedule-item schedule-item-alt"}
                            >
                                <Select 
                                    name="week_day" 
                                    label="Dia da semana"
                                    value={item.week_day}
                                    onChange={(e) => 
                                        {setScheduleItemValue(index, 'week_day', e.target.value)}
                                    }
                                    options={[
                                    { value: "0", label: "Domingo"},
                                    { value: "1", label: "Segunda"},
                                    { value: "2", label: "Terça"},
                                    { value: "3", label: "Quarta"},
                                    { value: "4", label: "Quinta"},
                                    { value: "5", label: "Sexta"},
                                    { value: "6", label: "Sábado"},
                                ]}/>
                                <Input 
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    value={item.from}
                                    onChange={(e) => 
                                        {setScheduleItemValue(index, 'from', e.target.value)}
                                    }
                                />
                                <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={item.to}
                                    onChange={(e) => 
                                        {setScheduleItemValue(index, 'to', e.target.value)}
                                    }
                                />
                                <div>
                                    { index !== 0 && <button type="button"
                                        onClick={() => {removeSchedule(index)}}>
                                        Remover horário
                                    </button>}
                                </div>
                            </div>
                        );
                    })}
                </fieldset>
                <footer>
                    <p>
                        <img src={warningIcon} alt=""/>
                        Importante! <br/>
                        Preencha todos os dados.
                    </p>
                    <button type="submit">
                        Salvar cadastro
                    </button>
                </footer>
            </form>
        </main>
    </div>
    );
}

export default TeacherForm;