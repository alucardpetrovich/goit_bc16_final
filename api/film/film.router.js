import { Router } from "express";
import { filmController } from "./film.controller";
import { authController } from "../auth/auth.controller";

const router = Router();

router.post(
  "/",
  authController.authorize,
  filmController.validateCreateFilm,
  filmController.createFilm
);
router.get(
  '/',
  filmController.getFilms
)

export const filmRouter = router;
