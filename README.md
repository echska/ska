# Parental Control Dashboard

A Flask backend and React frontend configured for deployment on Render.

## Deploy to Render

Use the button below to deploy this repository to Render:

<a href="https://render.com/deploy?repo=https://github.com/echska/ska"><img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render"></a>

## Services

- Backend: Flask API served with Gunicorn from `parental-control-system/backend`
- Frontend: React static site built from `parental-control-system/frontend`

## Required Configuration

Set `DASHBOARD_API_TOKEN` on the backend before using the dashboard. The frontend sign-in screen asks for the same token and sends it as a bearer token when loading or syncing dashboard data.

Optional backend configuration:

- `CORS_ORIGINS`: comma-separated list of allowed frontend origins. Use `*` only for local development.
- `PYTHONUNBUFFERED`: set to `1` for clearer container logs.

## Health Check

The backend health endpoint is:

```text
/health
```

## Local Development

Start the backend:

```bash
cd parental-control-system/backend
DASHBOARD_API_TOKEN=dev-token flask --app main run --host 0.0.0.0 --port 5000
```

Start the frontend in another terminal:

```bash
cd parental-control-system/frontend
npm install
npm start
```

Use `dev-token` on the sign-in screen.
