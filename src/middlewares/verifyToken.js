import Jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  let cookies = req?.headers?.cookie;
  console.log(cookies, "hello");
  let previousToken = cookies ? cookies.split("=")[1] : "";

  if (!previousToken) {
    return res
      .status(403)
      .json({ status: "FAILURE", msg: "Un-authorized user!!" });
  }

  // access token verification

  let user = Jwt.verify(
    previousToken,
    process.env.ACCESS_SECRET,
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: "FAILURE", msg: "Authorization failed!!" });
      }

      req.userId = user?.userId;
      req.email = user?.email;
      console.log(req.email, "helkhikgll");
      next();
    }
  );
};
