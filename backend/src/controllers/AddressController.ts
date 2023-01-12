import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddressModel } from "../models/AddressModel";

// Faz injeção de dependencia do model
const addressModel = container.resolve(AddressModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await addressModel.create(req.body.address);
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
    const response = await addressModel.listAll();
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
    const response = await addressModel.listOne(Number(id));
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
    const response = await addressModel.update(req.body.address, Number(id));
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
    const response = await addressModel.remove(Number(id));
    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
