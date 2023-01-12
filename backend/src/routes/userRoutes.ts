import * as express from "express"
import {
  listAll,
  listOne,
  create,
  update,
  remove,
  findUserByEmail,
  // uploadUserImage,
} from "../controllers/UserController";
const router = express.Router();

// Rota para criar um novo user
router.post("/user", create);

// Rota para buscar todos os users
router.get("/users", listAll);

// Rota para buscar um user
router.get("/user/:id", listOne);

// Rota para alterar um user
router.put("/user/:id", update);

// Rota para deletar um user
router.delete("/user/:id", remove);

// Rota para buscar um user com base no email
router.put("/findUserByEmail", findUserByEmail);

// // Rota para buscar um user com base no email
// router.put("/uploadUserImage", uploadUserImage);

export default router;
