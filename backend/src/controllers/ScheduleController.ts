import { Request, Response } from "express";
import { container } from "tsyringe";
import { ScheduleModel } from "../models/ScheduleModel";

// Faz injeção de dependencia do model
const scheduleModel = container.resolve(ScheduleModel);

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await scheduleModel.create(req.body.schedule);

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
    const response = await scheduleModel.listAll();

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
    const response = await scheduleModel.listOne(Number(id));

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
    const response = await scheduleModel.update(req.body.schedule, Number(id));

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
    const response = await scheduleModel.remove(Number(id));

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findUserLatestBarberShops = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idUser = req.params.idUser;
    const limit = req.query.limit;
    const barbershops = await scheduleModel.findUserLatestBarberShops(
      Number(idUser),
      Number(limit)
    );

    return res.json(barbershops);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findUserSchedules = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idUser = req.params.idUser;
    const limit = req.query.limit;
    const schedules = await scheduleModel.findUserSchedules(
      Number(idUser),
      Number(limit)
    );

    return res.json(schedules);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const scheduleAvaliation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await scheduleModel.scheduleAvaliation(req.body);

    return res.json(response);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};

export const findSchedulesByBarberId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idBarber = req.params.idBarber;
    const schedules = await scheduleModel.findSchedulesByBarberId(
      Number(idBarber)
    );

    return res.json(schedules);
  } catch (err) {
    return res.status(422).json({ erro: err });
  }
};
