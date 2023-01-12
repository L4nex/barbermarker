import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
} from "../controllers/DistrictController";
const router = express.Router();

// Rota para criar um novo district
router.post("/district", create);

// Rota para buscar todos os districts
router.get("/districts", listAll);

// Rota para buscar um district
router.get("/district/:id", listOne);

// Rota para alterar um district
router.put("/district/:id", update);

// Rota para deletar um district
router.delete("/district/:id", remove);

export default router;
