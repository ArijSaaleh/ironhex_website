#!/bin/bash

# Docker-based backup script

set -e

BACKUP_DIR="/home/deploy/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
PROJECT_DIR="/var/www/ironhex"

echo "💾 Creating Docker backup..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database from container
echo "📊 Backing up database..."
docker cp ironhex-api:/app/data/ironhex.db $BACKUP_DIR/ironhex-db-$TIMESTAMP.db 2>/dev/null || \
    cp $PROJECT_DIR/server/data/ironhex.db $BACKUP_DIR/ironhex-db-$TIMESTAMP.db 2>/dev/null || \
    echo "⚠️  Database not found"

# Backup environment file
echo "⚙️ Backing up configuration..."
cp $PROJECT_DIR/.env $BACKUP_DIR/env-$TIMESTAMP.backup

# Backup Docker volumes
echo "📦 Backing up Docker volumes..."
docker run --rm \
    -v ironhex_nginx-cache:/data \
    -v $BACKUP_DIR:/backup \
    alpine tar czf /backup/volumes-$TIMESTAMP.tar.gz -C /data .

# Create full project backup (excluding node_modules and git)
echo "📦 Creating full project archive..."
tar --exclude='node_modules' \
    --exclude='.git' \
    --exclude='client/dist' \
    --exclude='__pycache__' \
    -czf $BACKUP_DIR/ironhex-full-$TIMESTAMP.tar.gz \
    -C /var/www ironhex

# Keep only last 7 daily backups
echo "🧹 Cleaning old backups..."
cd $BACKUP_DIR
ls -t ironhex-db-*.db 2>/dev/null | tail -n +8 | xargs -r rm
ls -t env-*.backup 2>/dev/null | tail -n +8 | xargs -r rm
ls -t volumes-*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm
ls -t ironhex-full-*.tar.gz 2>/dev/null | tail -n +4 | xargs -r rm

echo "✅ Backup completed: $BACKUP_DIR"
ls -lh $BACKUP_DIR | tail -10
