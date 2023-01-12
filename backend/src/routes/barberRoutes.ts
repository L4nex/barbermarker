import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
  findBarber,
  findBarberByBarberShop
} from "../controllers/BarberController";
const router = express.Router();

// Rota para criar um novo barber
router.post("/barber", create);

// Rota para buscar todos os barbers
router.get("/barbers", listAll);

// Rota para buscar um barber
router.get("/barber/:id", listOne);

// Rota para alterar um barber
router.put("/barber/:id", update);

// Rota para deletar um barber
router.delete("/barber/:id", remove);

// Rota para buscar um barbeiro com base no id da barbearia e id do service
router.get("/findBarber/:idBarberShop/service/:idService", findBarber);

// Rota para buscar um barbeiro com base no id da barbearia
router.get("/findBarberByBarberShop/:idBarberShop/", findBarberByBarberShop);

export default router;
