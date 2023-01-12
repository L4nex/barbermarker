import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
} from "../controllers/CityController";
const router = express.Router();

// Rota para criar um novo city
router.post("/city", create);

// Rota para buscar todos os cities
router.get("/cities", listAll);

// Rota para buscar um city
router.get("/city/:id", listOne);

// Rota para alterar um city
router.put("/city/:id", update);

// Rota para deletar um city
router.delete("/city/:id", remove);

export default router;
