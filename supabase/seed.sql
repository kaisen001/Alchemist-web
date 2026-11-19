-- Seed EMS Academy materials (safe to re-run).
--
-- How to store the 3 PDFs:
-- 1. Run storage.sql (creates public bucket `learning`).
-- 2. In Supabase → Storage → learning → Upload:
--      THE_ALCHEMIST_EMS_TRINITY.pdf
--      Alchemist.pdf
--      SMC.pdf
-- 3. Public URL pattern:
--      https://<PROJECT_REF>.supabase.co/storage/v1/object/public/learning/<filename>
-- 4. Keep those URLs in learning_pdfs.url (this seed uses that pattern).
--
-- Local /learning/*.pdf files can stay as a fallback while you migrate.

insert into public.learning_pdfs (id, title, description, url, tags)
values
  (
    'ems-trinity',
    'THE ALCHEMIST EMS TRINITY',
    'Core EMS framework PDF for structured market reading.',
    'https://yspujlcakytniegpwgis.supabase.co/storage/v1/object/public/learning/THE_ALCHEMIST_EMS_TRINITY.pdf',
    array['EMS', 'Framework']
  ),
  (
    'alchemist-guide',
    'Alchemist Guide',
    'Foundational mentorship notes and process overview.',
    'https://yspujlcakytniegpwgis.supabase.co/storage/v1/object/public/learning/Alchemist.pdf',
    array['Mentorship']
  ),
  (
    'smc-ebook',
    'Smart Money SMC',
    'Liquidity and smart-money concepts companion ebook.',
    'https://yspujlcakytniegpwgis.supabase.co/storage/v1/object/public/learning/SMC.pdf',
    array['Liquidity', 'SMC']
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  url = excluded.url,
  tags = excluded.tags,
  updated_at = now();

insert into public.learning_videos (id, title, description, url, duration, tags)
values
  (
    'ems-intro',
    'EMS Session Intro',
    'Orientation to the EMS monthly session process.',
    '',
    '12:40',
    array['EMS', 'Live replay']
  ),
  (
    'liquidity-maps',
    'Reading Liquidity Maps',
    'How to spot order concentration and reactions.',
    '',
    '18:05',
    array['Liquidity']
  ),
  (
    'execution-model',
    'Execution Model Walkthrough',
    'Risk-first entries and review routine.',
    '',
    '22:10',
    array['Execution']
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  url = excluded.url,
  duration = excluded.duration,
  tags = excluded.tags,
  updated_at = now();
