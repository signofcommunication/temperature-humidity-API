import { Router } from "express";
import {
  createTanam,
  deleteTanam,
  getAllTanam,
  updateTanam,
} from "../controllers/Tanam.js";

const router = Router();

router.route("/").post(createTanam).get(getAllTanam);
router.route("/:id").patch(updateTanam).delete(deleteTanam);

export default router;
