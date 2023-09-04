import express from "express";
import userController from "../controllers/user.controller.js"

const router = express.Router()

const {getUsers, createUser, deleteUser} = userController

router.get("/", getUsers);

router.post("/", createUser);

router.delete("/:id", deleteUser)

export default router;