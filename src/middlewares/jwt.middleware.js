import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1. Read token
  const token = req.headers["authorization"];
  //2. If no token return error
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  //3. Check if token is valid
  try {
    const payload = jwt.verify(token, "7H9oNtw7VmBrhAgUUxPlNk2wEaHjDvZr");
     req.userID = payload.userID;
  } catch (err) {
    // 4. return error
    res.status(401).send("Unauthorized");
  }
  //. 5. Call next middleware
  next();
};

export default jwtAuth;
