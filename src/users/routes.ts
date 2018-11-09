import { Router } from 'express'
export function setup(route: Router) {
   
   
    route.get('/', (req, res) => {
        res.render('index')
    });

}