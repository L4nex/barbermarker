import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserModel } from "../models/UserModel";

// const multer = require('multer');
// const parser = multer({ dest: 'public/' })

// Faz injeção de dependencia do model
const userModel = container.resolve(UserModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await userModel.create(req.body.user);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const listAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await userModel.listAll();

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const listOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const response = await userModel.listOne(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const response = await userModel.update(req.body.user, Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const response = await userModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findUserByEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await userModel.findUserByEmail(req.body.email);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

// export const uploadUserImage = async (req: Request, res: Response): Promise<Response> => {
//     parser.single('photo')(req, res, err => {
//         req
//     });
//     return res;
// }
