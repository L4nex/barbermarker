import { Request, Response } from "express";
import { container } from "tsyringe";
import { ServiceModel } from "../models/ServiceModel";

// Faz injeção de dependencia do model
const serviceModel = container.resolve(ServiceModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await serviceModel.create(req.body.service);

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
    const response = await serviceModel.listAll();

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
    const response = await serviceModel.listOne(Number(id));

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
    const response = await serviceModel.update(req.body.service, Number(id));

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
    const response = await serviceModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findByBarberShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idBarberShop = req.params.idBarberShop;

    const response = await serviceModel.findByBarberShop(Number(idBarberShop));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
