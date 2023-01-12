import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
  findByDateAndBarberId,
  removeById,
} from "../controllers/ScheduleTimeController";
const router = express.Router();

// Rota para criar um novo scheduleTime
router.post("/scheduleTime", create);

// Rota para buscar todos os scheduleTimes
router.get("/scheduleTimes", listAll);

// Rota para buscar um scheduleTime
router.get("/scheduleTime/:id", listOne);

// Rota para alterar um scheduleTime
router.put("/scheduleTime/:id", update);

// Rota para inativar um scheduleTime
router.delete("/scheduleTime/:id", remove);

// Rota para inativar um scheduleTime
router.delete("/scheduleTime/remove/:id", removeById);

// Rota para buscar um scheduleTime com base na data e id de barber
router.put("/findByDateAndBarberId", findByDateAndBarberId);

export default router;
