import { StatusCodes } from "http-status-codes";
import Tanaman from "../models/Tanaman/index.js";
import mongoose from "mongoose";

async function getAllTanamans(req, res) {
  try {
    const data = await Tanaman.find().exec();
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ err: e.message });
  }
}

async function createTanaman(req, res) {
  try {
    const newTanaman = new Tanaman(req.body);
    await newTanaman.save();
    res.status(StatusCodes.CREATED).json({ data: newTanaman });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ err: e.message });
  }
}

async function updateTanaman(req, res) {
  try {
    const { id } = req.params;
    const updatedTanaman = await Tanaman.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({ tanaman: updatedTanaman });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
}

async function deleteTanaman(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Tanaman found with id: ${id}`);

    await Tanaman.findByIdAndDelete(id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Tanaman deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error deleting Tanaman: ${error}`);
  }
}

export { getAllTanamans, deleteTanaman, updateTanaman, createTanaman };
