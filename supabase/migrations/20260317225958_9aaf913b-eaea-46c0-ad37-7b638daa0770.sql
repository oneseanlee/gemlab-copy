-- Purge stuck transactional email messages that can never send (no run_id)
SELECT pgmq.delete('transactional_emails', 1);
SELECT pgmq.delete('transactional_emails', 2);
SELECT pgmq.delete('transactional_emails', 3);
SELECT pgmq.delete('transactional_emails', 4);
SELECT pgmq.delete('transactional_emails', 5);
SELECT pgmq.delete('transactional_emails', 6);