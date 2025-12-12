# ⚠️ IMPORTANT: Database Migration Safety

## NEVER Use `db push --force-reset`

This command **DELETES ALL DATA** including user accounts!

## ✅ ALWAYS Use Safe Migration

```bash
npm run db:migrate
```

This will:
1. 📦 Automatically backup your database
2. 🚀 Run the migration
3. 🔨 Update Prisma client
4. ✅ Keep your data safe

## Restore if Needed

```bash
npm run db:restore
```

See `DATABASE_MIGRATION_GUIDE.md` for full details.
