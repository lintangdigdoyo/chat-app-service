import "module-alias/register"

import app from "./app"
import { env } from "@/config/env"

const PORT = env.APP_PORT

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`))
