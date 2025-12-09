# 🚀 GitHub Actions Auto-Deploy Setup Guide

This guide will set up automatic deployment to your VPS whenever you push to the `main` branch.

## 📋 Prerequisites

- GitHub repository with your code
- VPS with SSH access
- Project already set up on VPS at `/var/www/ironhex`

## 🔑 Step 1: Generate SSH Key for GitHub Actions

On your **local machine** or **VPS**, generate a deployment key:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key
```

This creates two files:
- `~/.ssh/github_deploy_key` (private key) - for GitHub
- `~/.ssh/github_deploy_key.pub` (public key) - for VPS

## 🖥️ Step 2: Add Public Key to VPS

On your **VPS**:

```bash
# SSH into VPS
ssh ubuntu@51.91.8.230

# Add the public key to authorized_keys
cat >> ~/.ssh/authorized_keys << 'EOF'
# Paste the contents of github_deploy_key.pub here
EOF

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
```

Or copy it directly:
```bash
# From your local machine
cat ~/.ssh/github_deploy_key.pub | ssh ubuntu@51.91.8.230 "cat >> ~/.ssh/authorized_keys"
```

## 🔐 Step 3: Add Secrets to GitHub

Go to your GitHub repository:

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `VPS_HOST` | Your VPS IP address | `51.91.8.230` |
| `VPS_USERNAME` | SSH username | `ubuntu` |
| `VPS_SSH_KEY` | Private key content | Contents of `github_deploy_key` file |
| `VPS_PORT` | SSH port | `22` |

### How to get VPS_SSH_KEY value:

```bash
# On your local machine
cat ~/.ssh/github_deploy_key
```

Copy the **entire output** including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...all the content...
-----END OPENSSH PRIVATE KEY-----
```

Paste this into the `VPS_SSH_KEY` secret.

## ✅ Step 4: Test the Workflow

The GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`.

### Test it:

```bash
# Make a small change
echo "# Auto-deploy test" >> README.md

# Commit and push
git add .
git commit -m "Test auto-deploy"
git push origin main
```

### Watch the deployment:

1. Go to your GitHub repository
2. Click **Actions** tab
3. You'll see the workflow running
4. Click on it to see live logs

## 🎯 What Happens on Each Push

Whenever you push to `main`:

1. ✅ GitHub Actions triggers
2. ✅ Connects to your VPS via SSH
3. ✅ Pulls latest code from GitHub
4. ✅ Rebuilds Docker containers
5. ✅ Restarts services
6. ✅ Cleans up old images
7. ✅ Reports success/failure

**Time: ~2-3 minutes per deployment**

## 🔍 Monitoring Deployments

### View deployment status:
- GitHub → Repository → **Actions** tab

### View deployment logs:
- Click on any workflow run
- Click on the job name
- Expand steps to see detailed logs

### If deployment fails:
- Check the error in GitHub Actions logs
- SSH into VPS and check: `docker-compose logs -f`

## 📝 Deployment Script

The deployment uses `deployment/docker-deploy.sh`:
- Pulls latest code
- Rebuilds containers
- Restarts services
- Cleans up old images

## 🛠️ Manual Deployment (if needed)

You can still deploy manually:

```bash
# SSH into VPS
ssh ubuntu@51.91.8.230

# Run deployment script
cd /var/www/ironhex
./deployment/docker-deploy.sh
```

Or trigger manually from GitHub:
- Go to **Actions** tab
- Select "Deploy to OVH VPS" workflow
- Click **Run workflow**

## 🚨 Troubleshooting

### Deployment fails with "Permission denied"
```bash
# On VPS, verify SSH key is added
cat ~/.ssh/authorized_keys | grep github-actions
```

### Deployment fails with "Host key verification failed"
Add VPS to GitHub Actions known hosts (already handled in workflow)

### Docker build fails
```bash
# On VPS, check logs
docker-compose logs -f
```

### Can't connect to VPS
Verify secrets are correct:
- VPS_HOST: `51.91.8.230`
- VPS_USERNAME: `ubuntu`
- VPS_PORT: `22`
- VPS_SSH_KEY: Complete private key

## 🎉 Success!

You should see:
- ✅ Green checkmark in GitHub Actions
- ✅ Updated website at http://51.91.8.230
- ✅ Deployment logs showing success

**Now every push to main automatically deploys to production!** 🚀

## 📊 Example Workflow

```
Local changes → git push → GitHub Actions → SSH to VPS → 
Pull code → Build containers → Deploy → Live! 🎉
```

**Total time: ~2-3 minutes from push to live!**
