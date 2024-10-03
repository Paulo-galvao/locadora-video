import e from "express";
import rentController from "../controllers/rent-controller.js";
import check_token from "../middlewares/check-token.js";
import check_role from "../middlewares/check-role.js";
import verifyAge from "../middlewares/verify-age.js";

const router = e.Router();

router.post('/', check_token, check_role(["ADM"]), verifyAge,  rentController.store);
router.get('/', check_token, rentController.show);
router.get('/:id', check_token, rentController.showById);
router.put('/:id', check_token, check_role(["ADM"]), rentController.update);
router.delete('/:id', check_token, check_role(["ADM"]), rentController.destroy);

export default router; 