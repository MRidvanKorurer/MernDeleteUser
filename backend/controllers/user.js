const User = require("../models/user");
const bcrypt = require("bcrypt");

const getRandomAvatar = () => {
  const randomImg = Math.floor(Math.random() * 71);

  return `https://i.pravatar.cc/300?img=${randomImg}`;
};

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: "OK",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const defaultAvatar = getRandomAvatar();

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    res.status(200).json({
      status: "OK",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndDelete({ email });

    res.status(200).json({
      status: "OK",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
