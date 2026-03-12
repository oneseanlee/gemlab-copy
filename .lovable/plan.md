

## Plan: Clean Up GHL Test Leads

Delete the 3 test leads from the `leads` table where emails match the GHL test patterns.

### Technical Details

Run a single DELETE query via the insert tool (data operation, not schema change):

```sql
DELETE FROM leads WHERE email IN (
  'ghltest-e2e@best365labs.com',
  'ghlfinal@best365labs.com',
  'ghltest3@best365labs.com'
);
```

This removes only the test entries — no schema changes, no code changes needed.

