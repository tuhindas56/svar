import "dotenv-flow/config"
import fs from "fs/promises"
import { Client } from "pg"

async function setupTrigger() {
  const triggerSQL = await fs.readFile("./lib/db/trigger.sql", {
    encoding: "utf-8"
  })
  const client = new Client({ connectionString: process.env.DATABASE_URL })

  try {
    await client.connect()
    await client.query(triggerSQL)
    console.log("[✓] Trigger is set up")
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}

setupTrigger()
