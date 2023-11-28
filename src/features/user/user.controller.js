import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";

export class UserController {
  signIn(req, res) {
    const result = UserModel.signIn(req.body.email, req.body.password);
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
  }

  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    res.status(201).send(newUser);
  }
}
