import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
  findByBarberShop,
} from "../controllers/ServiceController";
const router = express.Router();

// Rota para criar um novo service
router.post("/service", create);

// Rota para buscar todos os services
router.get("/services", listAll);

// Rota para buscar um service
router.get("/service/:id", listOne);

// Rota para alterar um service
router.put("/service/:id", update);

// Rota para deletar um service
router.delete("/service/:id", remove);

// Rota para buscar os services com base no id da barberShpo
router.get("/services/findByBarberShop/:idBarberShop", findByBarberShop)

export default router;
