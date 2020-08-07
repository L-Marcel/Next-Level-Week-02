import React, { useState, useEffect } from 'react';

import './style.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList = () => {
    const [subject, setSubject] = useState('Todas');
    const [week_day, setWeekDay] = useState('Todos');
    const [time, setTime] = useState('');

    const [teacher, setTeachers] = useState([]);

    useEffect(() => {
        if(subject !== "-- Escolha --" && time !== "" && week_day !== "-- Escolha --"){
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

    return(
    <div id="page-teacher-list" className="container">
        <PageHeader title="Esses são os profys disponíveis.">
            <form id="search-teachers" action="">
                <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}} 
                    options={[
                    { value: "-- Escolha --", label: "-- Escolha --"},
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
                <Select 
                    name="week_day" 
                    label="Dia da semana" 
                    value={week_day}
                    onChange={(e) => {setWeekDay(e.target.value)}} 
                    options={[
                    { value: "-- Escolha --", label: "-- Escolha --"},
                    { value: "0", label: "Domingo"},
                    { value: "1", label: "Segunda"},
                    { value: "2", label: "Terça"},
                    { value: "3", label: "Quarta"},
                    { value: "4", label: "Quinta"},
                    { value: "5", label: "Sexta"},
                    { value: "6", label: "Sábado"},
                ]}/>                
                <Input 
                    type="time" 
                    name="time" 
                    label="Hora"
                    value={time}
                    onChange={(e) => {setTime(e.target.value)}} 
                />
            </form>
        </PageHeader>

        <main>
            {teacher.map(function(item, index){
                return(
                    <TeacherItem 
                        key={index}
                        {...item}
                    />
                );
            })}
        </main>
    </div>
    );
}

export default TeacherList;