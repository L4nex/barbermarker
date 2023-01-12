import { Request, Response } from "express";
import { container } from "tsyringe";
import { ScheduleTimeModel } from "../models/ScheduleTimeModel";

// Faz injeção de dependencia do model
const scheduleTimeModel = container.resolve(ScheduleTimeModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await scheduleTimeModel.create(req.body.scheduleTime);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const createAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await scheduleTimeModel.createAll(req.body.scheduleTimes);

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
    const response = await scheduleTimeModel.listAll();

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
    const response = await scheduleTimeModel.listOne(Number(id));

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
    const response = await scheduleTimeModel.update(
      req.body.scheduleTime,
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
    const response = await scheduleTimeModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const removeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const response = await scheduleTimeModel.delete(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findByDateAndBarberId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await scheduleTimeModel.findByDateAndBarberId(req.body);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
