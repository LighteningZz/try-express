import { Router } from 'express'
import Controller from './controller'
export function setup(route: Router) {
   
   
    route.get('/', (req, res) => {
        res.render('index')
    });


    route.post('/add', Controller.Add);

}