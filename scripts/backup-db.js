const fs = require('fs');
const path = require('path');

function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '..', 'backups');

    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
    const backupPath = path.join(backupDir, `dev.db.${timestamp}.backup`);

    if (fs.existsSync(dbPath)) {
        fs.copyFileSync(dbPath, backupPath);
        console.log(`✅ Database backed up to: ${backupPath}`);

        // Keep only last 10 backups
        const backups = fs.readdirSync(backupDir)
            .filter(f => f.startsWith('dev.db.') && f.endsWith('.backup'))
            .map(f => ({
                name: f,
                path: path.join(backupDir, f),
                time: fs.statSync(path.join(backupDir, f)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);

        if (backups.length > 10) {
            backups.slice(10).forEach(backup => {
                fs.unlinkSync(backup.path);
                console.log(`🗑️  Removed old backup: ${backup.name}`);
            });
        }

        return backupPath;
    } else {
        console.log('⚠️  No database file found to backup');
        return null;
    }
}

module.exports = { createBackup };

// Run directly
if (require.main === module) {
    createBackup();
}
