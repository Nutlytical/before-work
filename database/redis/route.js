const axios = require("axios");
const redis = require("redis");
const router = require("express").Router();

const redisUrl = "redis://172.24.0.2:6379";
const client = redis.createClient(redisUrl);

client.connect();

router.post("/", async (req, res) => {
  const { key, value } = req.body;
  const response = await client.set(key, value);

  res.json(response);
});

router.get("/", async (req, res) => {
  const { key } = req.body;
  const response = await client.get(key);

  res.json(response);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cached = await client.get(`post-${id}`);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  await client.set(`post-${id}`, JSON.stringify(response.data));
  await client.expire(`post-${id}`, 5);

  return res.json(response.data);
});

module.exports = router;
