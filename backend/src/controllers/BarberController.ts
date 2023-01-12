import { Request, Response } from "express";
import { container } from "tsyringe";
import { BarberModel } from "../models/BarberModel";

// Faz injeção de dependencia do model
const barberModel = container.resolve(BarberModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await barberModel.create(req.body.barber);

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
    const response = await barberModel.listAll();

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
    const response = await barberModel.listOne(Number(id));

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
    const response = await barberModel.update(req.body.barber, Number(id));

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
    const response = await barberModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findBarber = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idBarberShop = req.params.idBarberShop;
    const idService = req.params.idService;

    const response = await barberModel.findBarber(
      Number(idBarberShop),
      Number(idService)
    );

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findBarberByBarberShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idBarberShop = req.params.idBarberShop;

    const response = await barberModel.findBarberByBarberShop(
      Number(idBarberShop)
    );

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
