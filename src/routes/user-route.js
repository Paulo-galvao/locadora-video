import e from "express";
import userController from "../controllers/user-controller.js";
import cepAddress from "../middlewares/cep-address.js";
import check_token from "../middlewares/check-token.js";
import check_role from "../middlewares/check-role.js";
const router = e.Router();

router.post("/",check_token, check_role(["ADM"]), userController.store);
router.get("/",check_token, userController.show);
router.get("/:id",check_token, userController.showById);
router.put("/:id",check_token, check_role(["ADM"]), userController.update);
router.delete("/:id",check_token, check_role(["ADM"]), userController.destroy);

router.post('/signup', userController.signup);
router.post('/login', userController.login);

export default router;