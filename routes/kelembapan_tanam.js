import { Router } from "express";
import {
  updateKelembapanTanam,
  createKelembapanTanam,
  getKelembapanTanam,
  deleteKelembapanTanam,
} from "../controllers/Kelembapan_Tanam.js";

const router = Router();

router.route("/").get(getKelembapanTanam).post(createKelembapanTanam);
router.route("/:id").patch(updateKelembapanTanam).delete(deleteKelembapanTanam);

export default router;
