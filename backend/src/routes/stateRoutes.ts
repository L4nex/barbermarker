import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
} from "../controllers/StateController";
const router = express.Router();

// Rota para criar um novo state
router.post("/state", create);

// Rota para buscar todos os states
router.get("/states", listAll);

// Rota para buscar um state
router.get("/state/:id", listOne);

// Rota para alterar um state
router.put("/state/:id", update);

// Rota para deletar um state
router.delete("/state/:id", remove);

export default router;
