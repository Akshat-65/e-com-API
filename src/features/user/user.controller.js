import bcrypt from 'bcrypt';
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
      // 1. Find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if(!user){
        return res.status(400).send("Incorrect credentials");
      }
      else{
        // 2.compare password with hashed password
        const result =  await bcrypt.compare(req.body.password,user.password);
        if(result){
        // 3. Create JWT
        const token = jwt.sign(
          { userID: result.id, email: result.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        // 4. Send token
        return res.status(200).send(token);
        }
        else{
          return res.status(400).send("Incorrect credentials");
        }
      }
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashPassword = await bcrypt.hash(password,12);
      const user = new UserModel(name, email, hashPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
