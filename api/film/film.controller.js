import Joi from "joi";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ValidationError,
  ConflictError,
  UnauthorizedError,
} from "../helpers/errors.contructor";
import { userModel } from "../user/user.model";
import { getControllerProxy } from "../helpers/controllers.proxy";
import { sessionModel } from "../session/session.model";
import { dto } from "../helpers/dto";
import { filmModel } from "./film.model";

class FilmController {
  constructor() {
    this._saltRounds = 5;
    this._jwtSecret = process.env.JWT_SECRET;
  }

  async createFilm(req, res) {
    // 1. auth
    // 2. validate body
    // 3. create film

    const { name, genre } = req.body;

    await filmModel.createFilm(name, genre);

    return res.status(201).send();
  }

  async getFilms(req, res) {
    const films = await filmModel.find();

    return res.status(200).json({
      films: films.map((film) => ({
        id: film._id,
        name: film.name,
        genre: film.genre,
      })),
    });
  }

  validateCreateFilm(req, res, next) {
    const createFilmRules = Joi.object({
      name: Joi.string().required(),
      genre: Joi.string().required(),
    });

    const result = Joi.validate(req.body, createFilmRules);
    if (result.error) {
      return next(new ValidationError(result.error));
    }

    next();
  }
}

export const filmController = getControllerProxy(new FilmController());
