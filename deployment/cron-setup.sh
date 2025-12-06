#!/bin/bash

# Setup cron jobs for automated maintenance

echo "⏰ Setting up cron jobs..."

# Add cron jobs
(crontab -l 2>/dev/null; echo "# IronHex automated maintenance") | crontab -
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/ironhex/deployment/backup.sh >> /var/log/ironhex-backup.log 2>&1") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 0 sudo apt update && sudo apt upgrade -y >> /var/log/system-update.log 2>&1") | crontab -
(crontab -l 2>/dev/null; echo "*/15 * * * * /var/www/ironhex/deployment/monitor.sh >> /var/log/ironhex-health.log 2>&1") | crontab -

echo "✅ Cron jobs configured:"
crontab -l

echo ""
echo "📋 Scheduled tasks:"
echo "  - Daily backup at 2:00 AM"
echo "  - Weekly system update on Sunday at 3:00 AM"
echo "  - Health check every 15 minutes"
