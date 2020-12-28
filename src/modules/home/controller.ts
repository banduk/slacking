import { Router } from 'express';
import { Request, Response } from 'express';
import IControllerBase from 'interfaces/IControllerBase.interface';

export default class HomeController implements IControllerBase {
  public path = '/';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/', this.index);
  }

  index = (req: Request, res: Response): void => {
    const users = [
      {
        id: 1,
        name: 'Ali',
      },
      {
        id: 2,
        name: 'Can',
      },
      {
        id: 3,
        name: 'Ahmet',
      },
    ];

    res.render('home/index', { users });
  };
}
