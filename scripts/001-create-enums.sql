-- Criar os tipos ENUM primeiro para evitar erros de dependência

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_pagamento_enum') THEN
        CREATE TYPE status_pagamento_enum AS ENUM ('pago', 'pendente');
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_cliente_enum') THEN
        CREATE TYPE status_cliente_enum AS ENUM ('novo', 'fechado', 'em andamento');
    END IF;
END$$;
