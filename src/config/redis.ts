import { Redis } from "ioredis"

const redis = new Redis({
  host: "localhost",
  port: 6379,
})

redis.on("error", (err) => {
  console.error("Redis error: ", err)
})

process.on("SIGINT", () => {
  redis.quit(() => {
    console.log("Redis connection closed.")
    process.exit(0)
  })
})

export default redis
