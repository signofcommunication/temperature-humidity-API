import { Router } from "express";
import {
  createTanaman,
  deleteTanaman,
  getAllTanamans,
  updateTanaman,
} from "../controllers/Tanaman.js";

const router = Router();

router.route("/").post(createTanaman).get(getAllTanamans);
router.route("/:id").delete(deleteTanaman).patch(updateTanaman);

export default router;
