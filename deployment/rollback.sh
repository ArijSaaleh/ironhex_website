#!/bin/bash

# Rollback script to revert to previous deployment
# Usage: ./rollback.sh [commit-hash]

set -e

COMMIT_HASH=${1:-HEAD~1}

echo "⏮️  Rolling back to commit: $COMMIT_HASH"

cd /var/www/ironhex

# Backup current state
BACKUP_BRANCH="backup-$(date +%Y%m%d-%H%M%S)"
git branch $BACKUP_BRANCH

echo "💾 Current state backed up to branch: $BACKUP_BRANCH"

# Rollback
git reset --hard $COMMIT_HASH

# Redeploy
echo "🚀 Redeploying..."
./deployment/deploy.sh

echo ""
echo "✅ Rollback completed!"
echo "📌 To restore if needed: git checkout $BACKUP_BRANCH"
