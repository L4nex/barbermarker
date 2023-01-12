import { Request, Response } from "express";
import { container } from "tsyringe";
import { BarberShopModel } from "../models/BarberShopModel";

// Faz injeção de dependencia do model
const barberShopModel = container.resolve(BarberShopModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await barberShopModel.create(req.body.barberShop);

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
    const response = await barberShopModel.listAll();

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
    const response = await barberShopModel.listOne(Number(id));

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
    const response = await barberShopModel.update(
      req.body.barberShop,
      Number(id)
    );

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
    const response = await barberShopModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await barberShopModel.findByName(req.body);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findNearlyBarberShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await barberShopModel.findNearlyBarberShop(req.body);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findBarberShopByEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await barberShopModel.findBarberShopByEmail(
      req.body.email
    );

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
