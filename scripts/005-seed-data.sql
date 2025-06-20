-- Inserir dados na tabela admins
INSERT INTO admins (email, senha_hash) VALUES
('admin@example.com', 'hash_senha_segura_admin1'), -- Substitua por hashes reais
('supervisor@example.com', 'hash_senha_segura_supervisor1');

-- Definir alguns UUIDs para clientes para facilitar a referência em acessos_publicos
DO $$
DECLARE
    cliente_ana_id UUID := gen_random_uuid();
    cliente_bruno_id UUID := gen_random_uuid();
    cliente_carla_id UUID := gen_random_uuid();
BEGIN
    -- Inserir dados na tabela clientes
    INSERT INTO clientes (id, nome, email, telefone, data_teste, melancolico, sanguineo, fleumatico, colerico, status_pagamento, status_cliente, valor_pago, criado_em) VALUES
    (cliente_ana_id, 'Ana Clara Silva', 'ana.silva@example.com', '11987654321', '2024-06-15', 60, 15, 15, 10, 'pago', 'fechado', 150.00, '2024-06-10 10:00:00'),
    (cliente_bruno_id, 'Bruno Alves Costa', 'bruno.costa@example.com', '21998877665', '2024-06-12', 20, 50, 20, 10, 'pendente', 'em andamento', 0.00, '2024-06-11 11:30:00'),
    (cliente_carla_id, 'Carla Beatriz Dias', 'carla.dias@example.com', '31988889999', '2024-05-28', 10, 20, 30, 40, 'pago', 'fechado', 150.00, '2024-05-25 09:00:00'),
    (gen_random_uuid(), 'Daniel Faria Martins', 'daniel.martins@example.com', '41977776666', '2024-06-01', 25, 25, 25, 25, 'pago', 'novo', 150.00, '2024-06-01 14:00:00'),
    (gen_random_uuid(), 'Eduarda Souza Faria', 'eduarda.faria@example.com', '51966665555', '2024-06-18', 5, 15, 70, 10, 'pendente', 'em andamento', 0.00, '2024-06-18 16:20:00'),
    (gen_random_uuid(), 'Fábio Castro Lima', 'fabio.lima@example.com', '61955554444', '2024-06-20', 35, 35, 15, 15, 'pago', 'fechado', 200.00, '2024-06-20 18:00:00');

    -- Inserir dados na tabela acessos_publicos
    INSERT INTO acessos_publicos (cliente_id, telefone_consultado, data_acesso) VALUES
    (cliente_ana_id, '11987654321', '2024-06-21 09:15:00'),
    (cliente_bruno_id, '21998877665', '2024-06-21 10:30:00'),
    (cliente_ana_id, '11987654321', '2024-06-22 14:00:00'); -- Ana foi consultada novamente
END $$;
