import { Router, Request, Response } from 'express'

class UserController {

    Add(req: Request, res: Response) {
        const body = req.body;
        res.render('add', { user_name: body.user_name })
    }

}
export default new UserController