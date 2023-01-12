import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
} from "../controllers/ProfileController";
const router = express.Router();

// Rota para criar um novo profile
router.post("/profile", create);

// Rota para buscar todos os profiles
router.get("/profiles", listAll);

// Rota para buscar um profile
router.get("/profile/:id", listOne);

// Rota para alterar um profile
router.put("/profile/:id", update);

// Rota para deletar um profile
router.delete("/profile/:id", remove);

export default router;
