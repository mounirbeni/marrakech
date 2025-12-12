# Database Migration Guide

## 🔒 Protected Migration System

Your user authentication data is now protected with an automatic backup system.

## Quick Commands

```bash
# Create manual backup
npm run db:backup

# Run safe migration (auto-backup + migrate)
npm run db:migrate

# Restore from backup
npm run db:restore

# Open Prisma Studio
npm run db:studio
```

## How It Works

### Automatic Backups
- Every migration automatically creates a backup first
- Backups are timestamped: `dev.db.2024-12-12T17-54-30-123Z.backup`
- Last 10 backups are kept (older ones auto-deleted)
- Stored in: `/backups/`

### Safe Migration Process

When you run `npm run db:migrate`:

1. **📦 Backup**: Current database is backed up
2. **🚀 Migrate**: Prisma migration runs
3. **🔨 Generate**: Prisma client regenerates
4. **✅ Done**: If anything fails, backup location is shown

### Restore From Backup

If something goes wrong:

```bash
npm run db:restore
```

This shows you all available backups with timestamps. Choose one to restore.

## Migration Workflow

### ❌ WRONG Way (Data Loss Risk)
```bash
npx prisma db push --force-reset  # ⚠️ DELETES ALL DATA!
```

### ✅ CORRECT Way (Safe)
```bash
npm run db:migrate  # Backs up first, then migrates safely
```

## Example: Adding a New Feature

Let's say you want to add a new "Newsletter" feature:

### Step 1: Update Schema
```prisma
// prisma/schema.prisma
model Newsletter {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### Step 2: Run Safe Migration
```bash
npm run db:migrate
```

You'll be prompted to name the migration:
```
? Enter a name for the new migration: › add_newsletter
```

### Step 3: Done!
- ✅ Database backed up automatically
- ✅ Migration applied
- ✅ Prisma client regenerated
- ✅ User data preserved

## What Gets Backed Up

Everything in your database:
- ✅ User accounts (emails, passwords, names, roles)
- ✅ Bookings
- ✅ Messages
- ✅ Conversations
- ✅ Reviews
- ✅ ALL data

## Backup Storage

```
marrakech/
├── backups/
│   ├── dev.db.2024-12-12T17-30-00-000Z.backup
│   ├── dev.db.2024-12-12T17-45-00-000Z.backup
│   └── dev.db.2024-12-12T17-54-00-000Z.backup
├── prisma/
│   ├── dev.db (current database)
│   └── schema.prisma
└── scripts/
    ├── backup-db.js
    ├── safe-migrate.js
    └── restore-db.js
```

## Emergency Recovery

If you accidentally lose data:

### Option 1: Restore Latest Backup
```bash
npm run db:restore
# Select the most recent backup
```

### Option 2: Restore Specific Backup
```bash
npm run db:restore
# Select the backup from before the problem
```

### Option 3: Manual Restore
```bash
cp backups/dev.db.2024-12-12T17-54-00-000Z.backup prisma/dev.db
npx prisma generate
```

## Testing the System

### Test 1: Create a Backup
```bash
npm run db:backup
```
Check `/backups/` folder - you should see a new `.backup` file.

### Test 2: Safe Migration
```bash
# Make a small schema change
# Then run:
npm run db:migrate
```
Should see:
1. Backup created
2. Migration run
3. Client generated

### Test 3: Restore from Backup
```bash
npm run db:restore
```
Should see list of backups and be able to select one.

## Best Practices

### ✅ DO:
- Use `npm run db:migrate` for all schema changes
- Create manual backups before major changes: `npm run db:backup`
- Test migrations on a copy of the database first
- Keep recent backups for at least a week

### ❌ DON'T:
- Use `db push --force-reset` in production
- Delete backup files manually
- Make schema changes without migrations
- Skip testing migrations

## Production Deployment

For production, use environment variables:

```env
# .env.production
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

And use Prisma migrations:
```bash
npx prisma migrate deploy
```

## Monitoring Backups

Check backup status:
```bash
ls -lh backups/
```

Check backup count:
```bash
ls backups/*.backup | wc -l
```

## Troubleshooting

### "No backups found"
- Run `npm run db:backup` to create your first backup
- Check that `/backups/` directory exists

### "Migration failed"
- Backup was created before failure (check console for location)
- Restore with `npm run db:restore`
- Fix schema issue and try again

### "Prisma Client out of sync"
```bash
npx prisma generate
```

## Summary

🔒 **Your user data is now protected:**
- Every migration creates automatic backup
- Easy restore if something goes wrong
- No more accidental data loss
- Professional migration workflow

**From now on, always use:**
```bash
npm run db:migrate  # Instead of db push --force-reset
```
