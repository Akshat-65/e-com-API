import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signIn(req, res) {
    try {
      const result = await this.userRepository.signIn(
        req.body.email,
        req.body.password
      );
      if (!result) {
        return res.status(400).send("Incorrect credentials");
      } else {
        // 1. Create JWT
        const token = jwt.sign(
          { userID: result.id, email: result.email },
          "7H9oNtw7VmBrhAgUUxPlNk2wEaHjDvZr",
          { expiresIn: "1h" }
        );
        // 2. Send token
        return res.status(200).send(token);
      }
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = new UserModel(name, email, password, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
