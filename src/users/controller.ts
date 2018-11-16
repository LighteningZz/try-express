import { Router, Request, Response } from 'express'

class UserController {

    public Add(req: Request, res: Response) {
        const body: any = req.body;
        res.render('add', { user_name: body.user_name })
    }

}
export default new UserController