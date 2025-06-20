CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT,
    telefone TEXT UNIQUE NOT NULL,
    data_teste DATE,
    melancolico FLOAT CHECK (melancolico >= 0 AND melancolico <= 100),
    sanguineo FLOAT CHECK (sanguineo >= 0 AND sanguineo <= 100),
    fleumatico FLOAT CHECK (fleumatico >= 0 AND fleumatico <= 100),
    colerico FLOAT CHECK (colerico >= 0 AND colerico <= 100),
    status_pagamento status_pagamento_enum,
    status_cliente status_cliente_enum,
    valor_pago FLOAT,
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_total_temperamentos CHECK (melancolico + sanguineo + fleumatico + colerico <= 100.01 AND melancolico + sanguineo + fleumatico + colerico >= 99.99) -- Permite pequena margem para arredondamento de float
);
