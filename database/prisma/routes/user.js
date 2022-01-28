const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { user: UserModel } = new PrismaClient();

router.get("/", async (req, res) => {
  const users = await UserModel.findMany({
    select: {
      username: true,
      posts: true,
    },
  });

  res.json(users);
});

router.post("/", async (req, res) => {
  const { username } = req.body;

  const userExists = await UserModel.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await UserModel.create({
    data: {
      username,
    },
    select: {
      username: true,
    },
  });

  res.json(newUser);
});

module.exports = router;
