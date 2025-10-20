# IRONHEX Fullstack

This repo contains a React client (client/) and a FastAPI server (server/).

See `client/README.md` and `server/README.md` for per-app instructions.

Deployment notes
----------------

Recommended deployment:
- Client: Deploy the `client/dist` static site to Vercel (connected to this repo). The included `vercel.json` will build the client.
- Server: Deploy the FastAPI app to Render, Railway or Fly. Keep your SMTP credentials and `ADMIN_TOKEN` as environment variables.

GitHub Actions
--------------
There is a simple workflow at `.github/workflows/ci.yml` that builds the client on push to `main` and uploads the `dist` artifact. You can extend the workflow to deploy automatically.

Security note
-------------
The `/privatemessages` React page fetches messages using a token you provide. Keep `ADMIN_TOKEN` secret — do not check it into the repository.
