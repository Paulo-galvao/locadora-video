import e from "express";
import movieController from "../controllers/movie-controller.js";
import check_token from "../middlewares/check-token.js";
import check_role from "../middlewares/check-role.js";

const router = e.Router();

router.post('/', check_token, check_role(["ADM"]), movieController.store);
router.get('/', check_token, movieController.show);
router.get('/:id', check_token, movieController.showById);
router.put('/:id', check_token, check_role(["ADM"]), movieController.update);
router.delete('/:id', check_token, check_role(["ADM"]), movieController.destroy);

export default router;