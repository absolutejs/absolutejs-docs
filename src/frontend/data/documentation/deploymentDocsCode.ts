export const productionBuild = `\
# Build for production
bun run build

# This runs the build() function which:
# 1. Bundles all frontend code
# 2. Generates hashed asset filenames
# 3. Creates the manifest for asset lookup`;

export const productionStart = `\
# Start the production server
bun run src/backend/server.ts

# Or with PM2 for process management
pm2 start bun --name "my-app" -- run src/backend/server.ts`;

export const dockerFile = `\
FROM oven/bun:1.2

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Start the server with --host for Docker networking
CMD ["bun", "run", "src/backend/server.ts", "--host"]`;

export const dockerCompose = `\
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=app
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`;

export const flyConfig = `\
# fly.toml
app = "my-absolutejs-app"
primary_region = "iad"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "3000"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true`;

export const flyDeploy = `\
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login and create app
fly auth login
fly launch

# Deploy
fly deploy

# Set secrets
fly secrets set DATABASE_URL="postgresql://..."`;

export const railwayDeploy = `\
# Railway auto-detects Bun projects
# Just connect your GitHub repo and Railway handles the rest

# railway.json (optional)
{
  "\$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "bun run src/backend/server.ts --host",
    "healthcheckPath": "/health"
  }
}`;

export const renderDeploy = `\
# render.yaml
services:
  - type: web
    name: my-absolutejs-app
    env: node
    buildCommand: bun install && bun run build
    startCommand: bun run src/backend/server.ts --host
    envVars:
      - key: DATABASE_URL
        sync: false`;
