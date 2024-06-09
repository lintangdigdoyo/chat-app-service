import app from "./app"
import { env } from "./config/config"

const PORT = env.APP_PORT ?? 8080

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`))
