const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function restoreBackup() {
    const backupDir = path.join(__dirname, '..', 'backups');

    if (!fs.existsSync(backupDir)) {
        console.log('❌ No backups directory found');
        rl.close();
        return;
    }

    const backups = fs.readdirSync(backupDir)
        .filter(f => f.startsWith('dev.db.') && f.endsWith('.backup'))
        .map(f => ({
            name: f,
            path: path.join(backupDir, f),
            time: fs.statSync(path.join(backupDir, f)).mtime
        }))
        .sort((a, b) => b.time - a.time);

    if (backups.length === 0) {
        console.log('❌ No backups found');
        rl.close();
        return;
    }

    console.log('\n📦 Available backups:\n');
    backups.forEach((backup, index) => {
        console.log(`${index + 1}. ${backup.name}`);
        console.log(`   Created: ${backup.time.toLocaleString()}\n`);
    });

    const answer = await question('Enter backup number to restore (or 0 to cancel): ');
    const choice = parseInt(answer);

    if (choice === 0 || isNaN(choice) || choice < 1 || choice > backups.length) {
        console.log('Cancelled');
        rl.close();
        return;
    }

    const selectedBackup = backups[choice - 1];
    const confirm = await question(`\n⚠️  This will OVERWRITE your current database. Continue? (yes/no): `);

    if (confirm.toLowerCase() !== 'yes') {
        console.log('Cancelled');
        rl.close();
        return;
    }

    const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

    // Create backup of current db before restoring
    if (fs.existsSync(dbPath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const preRestoreBackup = path.join(backupDir, `dev.db.${timestamp}.pre-restore.backup`);
        fs.copyFileSync(dbPath, preRestoreBackup);
        console.log(`\n📦 Current database backed up to: ${preRestoreBackup}`);
    }

    // Restore
    fs.copyFileSync(selectedBackup.path, dbPath);
    console.log(`\n✅ Database restored from: ${selectedBackup.name}`);
    console.log('\n⚠️  Remember to run: npx prisma generate');

    rl.close();
}

restoreBackup();
