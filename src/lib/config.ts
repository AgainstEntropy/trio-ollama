import { loadEnvConfig } from '@next/env'

const projectRoot = process.cwd();
loadEnvConfig(projectRoot);

const config = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    FASTAPI_PORT: parseInt(process.env.FASTAPI_PORT as string),
}

export default config;