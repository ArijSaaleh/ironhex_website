#!/bin/bash

# Backup script for IronHex website
# Run this regularly or add to cron

set -e

BACKUP_DIR="/home/deploy/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
PROJECT_DIR="/var/www/ironhex"

echo "💾 Creating backup..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
echo "📊 Backing up database..."
cp $PROJECT_DIR/server/ironhex.db $BACKUP_DIR/ironhex-db-$TIMESTAMP.db

# Backup .env file
echo "⚙️ Backing up configuration..."
cp $PROJECT_DIR/server/.env $BACKUP_DIR/env-$TIMESTAMP.backup

# Create compressed archive of entire project
echo "📦 Creating project archive..."
tar -czf $BACKUP_DIR/ironhex-full-$TIMESTAMP.tar.gz -C /var/www ironhex

# Keep only last 7 backups
echo "🧹 Cleaning old backups..."
cd $BACKUP_DIR
ls -t ironhex-db-*.db | tail -n +8 | xargs -r rm
ls -t env-*.backup | tail -n +8 | xargs -r rm
ls -t ironhex-full-*.tar.gz | tail -n +4 | xargs -r rm

echo "✅ Backup completed: $BACKUP_DIR"
ls -lh $BACKUP_DIR | tail -10
