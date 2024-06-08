import Kelembapan_Tanam from "../models/Kelembapan_Tanam/Kelembapan_Tanam.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

async function getKelembapanTanam(req, res) {
  try {
    const data = await Kelembapan_Tanam.find().exec();
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res.status(StatusCodes.OK).json({ products });
  }
}

async function createKelembapanTanam(req, res) {
  try {
    const records = Array.isArray(req.body) ? req.body : [req.body];
    const createRecords = await Kelembapan_Tanam.insertMany(records);
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: createRecords });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
}

async function updateKelembapanTanam(req, res) {
  try {
    const { id } = req.params;
    const data = await Kelembapan_Tanam.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateKelembapanTanam)
      return `Kelembapan Tanam with ID:${id} Not Found!`;

    res
      .status(StatusCodes.OK)
      .json({ data, message: "Kelembapan Tanam Updated Successfully" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

async function deleteKelembapanTanam(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Kelembapan Tanam found with id: ${id}`);

    await Kelembapan_Tanam.findByIdAndDelete(id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Kelembapan Tanam Data Deleted Successfully" });
  } catch (error) {
    res.status(500).send(`Error deleting product: ${error.message}`);
  }
}

export {
  createKelembapanTanam,
  deleteKelembapanTanam,
  getKelembapanTanam,
  updateKelembapanTanam,
};
