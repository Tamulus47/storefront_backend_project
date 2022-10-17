import express, { Request, Response } from 'express';
import { Product,Products } from '../models/Products';
import { verify_auth } from '../helpers/JWT-helper';

const product= new Products;

const index = async (_req: Request, res: Response) => {
    const result = await product.index()
    res.json(result)
  }

  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await product.show(id);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      verify_auth(req)
      const { name, price } = req.body;
      const p: Product = { name, price };
      const result = await product.create(p);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const product_route= (app: express.Application)=>{
    app.get('/Products', index)
    app.get('/Products/:id', show)
    app.post('/Products', create)
}