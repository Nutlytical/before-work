const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { user: UserModel, post: PostModel } = new PrismaClient();

router.post("/", async (req, res) => {
  const { title, content, user_id } = req.body;

  const userExists = await UserModel.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }

  const newPost = await PostModel.create({
    data: {
      title,
      content,
      user_id,
    },
  });

  return res.json(newPost);
});

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const posts = await PostModel.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      title: true,
      content: true,
      created_at: true,
      user: true,
    },
  });

  return res.json(posts);
});

module.exports = router;
