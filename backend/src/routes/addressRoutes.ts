import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
} from "../controllers/AddressController";
const router = express.Router();

// Rota para criar um novo address
router.post("/address", create);

// Rota para buscar todos os addresses
router.get("/addresses", listAll);

// Rota para buscar um address
router.get("/address/:id", listOne);

// Rota para alterar um address
router.put("/address/:id", update);

// Rota para deletar um address
router.delete("/address/:id", remove);

export default router;
