import { Router } from "express";
import {
  createSuhuTanam,
  deleteSuhuTanam,
  getSuhuTanam,
  updateSuhuTanam,
} from "../controllers/Suhu_Tanam.js";

const router = Router();

router.route("/").get(getSuhuTanam).post(createSuhuTanam);
router.route("/:id").patch(updateSuhuTanam).delete(deleteSuhuTanam);

export default router;
