-- ================================================================
-- FAT LOSS TRACKER — SUPABASE DATABASE SETUP (Improved RLS)
-- ================================================================
-- Run this in Supabase → SQL Editor

-- Enable RLS on all tables (idempotent)
ALTER TABLE IF EXISTS weigh_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS gym_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS custom_programs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users own weigh_ins" ON weigh_ins;
DROP POLICY IF EXISTS "Users own gym_logs" ON gym_logs;
DROP POLICY IF EXISTS "Users own personal_records" ON personal_records;
DROP POLICY IF EXISTS "Users own user_settings" ON user_settings;
DROP POLICY IF EXISTS "Users own custom_programs" ON custom_programs;

-- ===== WEIGH-INS =====
CREATE TABLE IF NOT EXISTS weigh_ins (
    id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date       date NOT NULL,
    weight     numeric(5,1) NOT NULL,
    notes      text,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, date)
);

CREATE POLICY "Users can view own weigh_ins" ON weigh_ins
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weigh_ins" ON weigh_ins
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weigh_ins" ON weigh_ins
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own weigh_ins" ON weigh_ins
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ===== GYM LOGS ===== (similar pattern)
CREATE TABLE IF NOT EXISTS gym_logs (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date        date NOT NULL,
    day_id      text NOT NULL,
    day_name    text,
    exercises   jsonb NOT NULL DEFAULT '[]',
    body_weight numeric(5,1),
    created_at  timestamptz DEFAULT now(),
    UNIQUE(user_id, date, day_id)
);

CREATE POLICY "Users can view own gym_logs" ON gym_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own gym_logs" ON gym_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gym_logs" ON gym_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own gym_logs" ON gym_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ===== PERSONAL RECORDS =====
CREATE TABLE IF NOT EXISTS personal_records (
    id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    exercise     text NOT NULL,
    best_weight  numeric(6,1),
    best_reps    integer,
    best_volume  numeric(10,1),
    date         date,
    created_at   timestamptz DEFAULT now(),
    UNIQUE(user_id, exercise)
);

CREATE POLICY "Users can view own prs" ON personal_records FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own prs" ON personal_records FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prs" ON personal_records FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own prs" ON personal_records FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ===== USER SETTINGS =====
CREATE TABLE IF NOT EXISTS user_settings (
    id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id        uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    start_date     date,
    start_weight   numeric(5,1),
    goal_weight    numeric(5,1),
    weekly_target  numeric(3,2),
    units          text DEFAULT 'lbs',
    setup_complete boolean DEFAULT false,
    updated_at     timestamptz DEFAULT now()
);

CREATE POLICY "Users can view own settings" ON user_settings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON user_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON user_settings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own settings" ON user_settings FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ===== CUSTOM PROGRAMS =====
CREATE TABLE IF NOT EXISTS custom_programs (
    id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    program    jsonb NOT NULL,
    updated_at timestamptz DEFAULT now()
);

CREATE POLICY "Users can view own custom programs" ON custom_programs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own custom programs" ON custom_programs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own custom programs" ON custom_programs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own custom programs" ON custom_programs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_weigh_ins_user_date ON weigh_ins (user_id, date);
CREATE INDEX IF NOT EXISTS idx_gym_logs_user_date ON gym_logs (user_id, date);
CREATE INDEX IF NOT EXISTS idx_prs_user_exercise ON personal_records (user_id, exercise);
CREATE INDEX IF NOT EXISTS idx_settings_user ON user_settings (user_id);
CREATE INDEX IF NOT EXISTS idx_custom_programs_user ON custom_programs (user_id);

-- Optional: Enable RLS for anon (blocks everything)
-- CREATE POLICY "Block anon access" ON weigh_ins FOR ALL TO anon USING (false);  -- repeat for each table if needed
