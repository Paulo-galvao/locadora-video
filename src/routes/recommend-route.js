import e from "express";
import recommend from "../middlewares/recommendations.js";
const router = e.Router();

router.get('/:id', recommend);

export default router;