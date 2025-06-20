CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);
