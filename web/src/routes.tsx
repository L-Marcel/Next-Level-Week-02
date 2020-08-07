import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Ladding';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/teachers" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    );
}

export default Routes;