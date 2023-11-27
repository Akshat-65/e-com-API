import { UserModel } from "./user.model.js";

export class UserController {
  signIn(req, res) {
    const result = UserModel.signIn(req.body.email,req.body.password);
    if(!result){
       return res.status(400).send('Incorrect credentials')
    }
    else{
        return res.send("Login successful");
    }
  }

  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    res.status(201).send(newUser);
  }
}
