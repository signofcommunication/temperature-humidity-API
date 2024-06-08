import Tanam from "../models/Tanam/index.js";
import Tanaman from "../models/Tanaman/index.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

async function getAllTanam(req, res) {
  try {
    const data = await Tanam.find().exec();
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ err: e.message });
  }
}

async function createTanam(req, res) {
  try {
    const tanaman = await Tanaman.findById(req.body.Tanaman_ID);

    if (!tanaman) {
      return "Tanaman Not Found,Please Select The Available Tanaman in an options";
    }

    const tanam = new Tanam(req.body);

    await tanam.save();

    res
      .status(StatusCodes.CREATED)
      .json({ data: tanaman, message: "Tanam Data Created Successfully" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ err: error.message });
  }
}

async function updateTanam(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await Tanam.findOneAndUpdate({ Tanam_no: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return `Tanam with ${id} Not Found!`;
    }

    res
      .status(StatusCodes.OK)
      .json({ data, message: `Tanam with No ${id} updated successfully` });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

async function deleteTanam(req, res) {
  try {
    const { id } = req.params;
    const findTanaman = await Tanam.findOne({ Tanam_no: id });

    if (!findTanaman)
      return res.status(404).send(`No Tanam Nomor found with Nomor: ${id}`);

    await Tanam.findOneAndDelete({ Tanam_no: id });

    res.status(StatusCodes.OK).json({ message: "Tanam deleted successfully" });
  } catch (error) {
    res.status(500).send(`Error deleting product: ${error.message}`);
  }
}

export { getAllTanam, deleteTanam, updateTanam, createTanam };
