import { Request, Response } from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(req: Request, res: Response){
        const filters = req.query;

        if(!filters.week_day || !filters.subject || !filters.time){
            const classes = await db('classes')
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*','users.*']);

            return res.status(200).json(classes);
        }

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        const timeInMinute = convertHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinute])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinute])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*','users.*']);

        return res.status(200).json(classes);
    }
    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const thx = await db.transaction();
    
        try {
            const users = await thx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            const user_id = users[0];
        
            const classes = await thx('classes').insert({
                subject,
                cost,
                user_id
            });
            const class_id = classes[0];
        
            const classSchedule = schedule.map(function(item: ScheduleItem){
                return {
                    class_id,
                    week_day: item.week_day,
                    from: convertHoursToMinutes(item.from),
                    to: convertHoursToMinutes(item.to)
                };
            });
            await thx('class_schedule').insert(classSchedule);
            await thx.commit();
        
            const returnedUser = await db('users').select('*').where('id', user_id).first();
            const returnedClass = await db('classes').select('*').where('id', class_id).first();
            const returnedShedule = await db('class_schedule').select('*').where('class_id', class_id).first();
        
            const returnedJson = [
                returnedUser,
                returnedClass,
                returnedShedule
            ]
            
            console.log('sucess');
            return res.status(200).json(returnedJson);
        } catch (error) {
            await thx.rollback();
            
            console.log('error');
            return res.status(400).json({
                error
            });
        }
    }
}