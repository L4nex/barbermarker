import * as express from "express";
import {
  listAll,
  listOne,
  create,
  update,
  remove,
  findUserLatestBarberShops,
  findUserSchedules,
  scheduleAvaliation,
  findSchedulesByBarberId,
} from "../controllers/ScheduleController";
import { createAll } from "../controllers/ScheduleTimeController";
const router = express.Router();

// Rota para criar um novo schedule
router.post("/schedule", create);

// Rota para criar um novo schedule
router.post("/schedules", createAll);

// Rota para buscar todos os schedules
router.get("/schedules", listAll);

// Rota para buscar um schedule
router.get("/schedule/:id", listOne);

// Rota para alterar um schedule
router.put("/schedule/:id", update);

// Rota para deletar um schedule
router.delete("/schedule/:id", remove);

// Rota para buscar as ultimas 3 barbearias com base no id de user
router.get("/schedule/:idUser/latestBarberShops", findUserLatestBarberShops);

// Rota para buscar os ultimos users dos schedules
router.get("/schedules/:idUser/lasts", findUserSchedules);

// Rota para fazer a avaliação do corte
router.put("/scheduleAvaliation", scheduleAvaliation);

// Rota para buscar todos os schedules de um barber
router.get("/findSchedulesByBarberId/:idBarber", findSchedulesByBarberId);

export default router;
