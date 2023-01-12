import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
  findByName,
  findNearlyBarberShop,
  findBarberShopByEmail
} from "../controllers/BarberShopController";
const router = express.Router();

// Rota para criar um novo barberShop
router.post("/barberShop", create);

// Rota para buscar todos os barberShops
router.get("/barberShops", listAll);

// Rota para buscar um barberShop
router.get("/barberShop/:id", listOne);

// Rota para alterar um barberShop
router.put("/barberShop/:id", update);

// Rota para deletar um barberShop
router.delete("/barberShop/:id", remove);

// Rota para retornar barberShop pelo nome
router.put("/shopBarber/findByName", findByName);

// Rota para buscar barberShop com base na localização do user
router.put("/shopBarber/findNearlyBarberShop", findNearlyBarberShop);

// Rota para buscar uma barbearia com base no email
router.put("/findBarberShopByEmail", findBarberShopByEmail);

export default router;
