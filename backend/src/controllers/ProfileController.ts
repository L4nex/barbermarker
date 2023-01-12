import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileModel } from "../models/ProfileModel";

// Faz injeção de dependencia do model
const profileModel = container.resolve(ProfileModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await profileModel.create(req.body.profile);

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
    const response = await profileModel.listAll();

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
    const response = await profileModel.listOne(Number(id));

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
    const response = await profileModel.update(req.body.profile, Number(id));

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
    const response = await profileModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
