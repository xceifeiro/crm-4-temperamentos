CREATE TABLE IF NOT EXISTS acessos_publicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL, -- ou ON DELETE CASCADE dependendo da regra de negócio
    telefone_consultado TEXT,
    data_acesso TIMESTAMPTZ DEFAULT NOW()
);
