import { Request, Response } from "express";
import { container } from "tsyringe";
import { CityModel } from "../models/CityModel";

// Faz injeção de dependencia do model
const cityModel = container.resolve(CityModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await cityModel.create(req.body.city);

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
    const response = await cityModel.listAll();

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
    const response = await cityModel.listOne(Number(id));

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
    const response = await cityModel.update(req.body.city, Number(id));

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
    const response = await cityModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
