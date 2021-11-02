const API_KEY = process.env.API_KEY;

module.exports = (req, res, next) => {
  try {
    const key = req.header("API_KEY");

    //check key or not
    if (!key) {
      return res.status(401).json({ message: "No key , Authorization Denied" });
    }
    if (key === API_KEY) {
      next();
    }
  } catch (error) {
    res.status(401).json({ msg: "Key not valid" });
  }
};
