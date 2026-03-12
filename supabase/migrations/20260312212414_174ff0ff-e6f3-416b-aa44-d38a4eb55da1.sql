-- Store SUPABASE_URL and SUPABASE_ANON_KEY in vault for trigger usage
SELECT vault.create_secret(
  'https://yyuoyitapltnuqhkjyfd.supabase.co',
  'SUPABASE_URL'
);

SELECT vault.create_secret(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dW95aXRhcGx0bnVxaGtqeWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMDQ5ODQsImV4cCI6MjA4Njg4MDk4NH0.HotKpq8MuflxTh1jDgJAhkWRKyXnl2VkFq2gHdGcvaQ',
  'SUPABASE_ANON_KEY'
);