import { StatusCodes } from "http-status-codes";
import Suhu_Tanam from "../models/Suhu_Tanam/index.js";
import mongoose from "mongoose";

async function getSuhuTanam(req, res) {
  try {
    const data = await Suhu_Tanam.find().exec();
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ err: error.message });
  }
}

async function updateSuhuTanam(req, res) {
  try {
    const { id } = req.params;
    const updatedSuhuTanam = await Suhu_Tanam.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSuhuTanam) {
      return `Suhu_Tanam with id:${id} not found`;
    }

    res.status(StatusCodes.OK).json({
      data: updatedSuhuTanam,
      message: "Suhu Tanam Updated Successfully",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

async function deleteSuhuTanam(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Suhu Tanam found with id: ${id}`);

    await Suhu_Tanam.findByIdAndDelete(id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Suhu Tanam deleted successfully" });
  } catch (error) {
    res.status(500).send(`Error deleting product: ${error.message}`);
  }
}

async function createSuhuTanam(req, res) {
  try {
    const records = Array.isArray(req.body) ? req.body : [req.body];
    const createdRecords = await Suhu_Tanam.insertMany(records);
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: createdRecords });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
}

export { createSuhuTanam, getSuhuTanam, updateSuhuTanam, deleteSuhuTanam };
