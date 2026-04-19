CREATE DATABASE coworking;
use coworking;

-- ============================================================
-- TABLE : users
-- ============================================================
CREATE TABLE users (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('member', 'admin') NOT NULL DEFAULT 'member',
    phone       VARCHAR(20) NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- TABLE : spaces
-- ============================================================
CREATE TABLE spaces (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    type            ENUM('bureau', 'salle_reunion', 'espace_ouvert', 'cabine') NOT NULL,
    capacity        INT UNSIGNED NOT NULL DEFAULT 1,
    price_per_hour  DECIMAL(10, 2) NOT NULL,
    description     TEXT NULL,
    status          ENUM('disponible', 'indisponible', 'maintenance') NOT NULL DEFAULT 'disponible',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- TABLE : subscriptions
-- ============================================================
CREATE TABLE subscriptions (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    type        ENUM('mensuel', 'trimestriel', 'annuel') NOT NULL,
    start_date  DATE NOT NULL,
    end_date    DATE NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    status      ENUM('actif', 'inactif', 'expire', 'suspendu') NOT NULL DEFAULT 'actif',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_subscription_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- TABLE : reservations
-- ============================================================
CREATE TABLE reservations (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    space_id    BIGINT UNSIGNED NOT NULL,
    date        DATE NOT NULL,
    start_time  TIME NOT NULL,
    end_time    TIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status      ENUM('en_attente', 'confirmee', 'annulee', 'terminee') NOT NULL DEFAULT 'en_attente',
    notes       TEXT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_reservation_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
 
    CONSTRAINT fk_reservation_space
        FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
 
    -- Empêcher les conflits de réservation
    UNIQUE KEY uq_space_time_slot (space_id, date, start_time, end_time)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE : payments
-- ============================================================
CREATE TABLE payments (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    reservation_id  BIGINT UNSIGNED NULL,
    subscription_id BIGINT UNSIGNED NULL,
    amount          DECIMAL(10,2) NOT NULL,
    method          ENUM('especes','carte','virement','en_ligne') NOT NULL DEFAULT 'especes',
    status          ENUM('en_attente','paye','rembourse','echoue') NOT NULL DEFAULT 'en_attente',
    payment_date    DATETIME NULL,
    due_date        DATE NOT NULL,
    reference       VARCHAR(100) NULL UNIQUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_payment_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_payment_reservation
        FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE SET NULL,
    CONSTRAINT fk_payment_subscription
        FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
) ENGINE=InnoDB;
SELECT id, name FROM users;


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE payments;
TRUNCATE TABLE reservations;
TRUNCATE TABLE subscriptions;
TRUNCATE TABLE spaces;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (name, email, password, role, phone) VALUES
('coworking',       'gestioncoworking@gmail.com', '$2y$10$exampleHashedPassword1234567890', 'admin',  NULL),
('Ahmed Benali',    'ahmed@gmail.com',             '$2y$10$exampleHashedPassword1234567890', 'member', '0612345678'),
('Sara Alaoui',     'sara@gmail.com',              '$2y$10$exampleHashedPassword1234567890', 'member', '0623456789'),
('Youssef Idrissi', 'youssef@gmail.com',           '$2y$10$exampleHashedPassword1234567890', 'member', '0634567890'),
('Fatima Zahra',    'fatima@gmail.com',             '$2y$10$exampleHashedPassword1234567890', 'member', '0645678901'),
('Karim Mansouri',  'karim@gmail.com',             '$2y$10$exampleHashedPassword1234567890', 'member', '0656789012'),
('Nadia Tazi',      'nadia@gmail.com',             '$2y$10$exampleHashedPassword1234567890', 'member', '0667890123'),
('Administrateur',  'admin@coworking.ma',          '$2y$10$exampleHashedPassword1234567890', 'admin',  NULL);

-- ============================================================
-- SPACES (6 espaces)
-- ============================================================
INSERT INTO spaces (name, type, capacity, price_per_hour, description, status) VALUES
('Salle réunion',         'salle_reunion', 8,  150.00, 'Salle de réunion avec projecteur',          'disponible'),
('Zone d\'Étude',         'espace_ouvert', 20, 30.00,  'Zone de travail collaboratif',              'disponible'),
('Bureau Privé',          'bureau',        1,  50.00,  'Bureau individuel équipé',                  'disponible'),
('Espace Premium',        'bureau',        1,  100.00, 'Bureau individuel calme avec vue',          'disponible'),
('Open Space',            'espace_ouvert', 20, 30.00,  'Espace ouvert collaboratif',                'disponible'),
('Espace Bureau Moderne', 'bureau',        2,  90.00,  'Espace moderne pour travail professionnel', 'disponible');
ALTER TABLE spaces ADD COLUMN image VARCHAR(500) NULL AFTER description;
-- ============================================================
-- SUBSCRIPTIONS (6 abonnements)
-- ============================================================
INSERT INTO subscriptions (user_id, type, start_date, end_date, price, status) VALUES
(2, 'mensuel',     '2025-01-01', '2025-01-31', 500.00,  'expire'),
(3, 'trimestriel', '2025-01-01', '2025-03-31', 1200.00, 'expire'),
(4, 'mensuel',     '2025-02-01', '2025-02-28', 500.00,  'expire'),
(5, 'annuel',      '2025-01-01', '2025-12-31', 4000.00, 'actif'),
(6, 'mensuel',     '2025-03-01', '2025-03-31', 500.00,  'expire'),
(7, 'trimestriel', '2025-02-01', '2025-04-30', 1200.00, 'actif');

-- ============================================================
-- RESERVATIONS (6 réservations)
-- ============================================================
INSERT INTO reservations (user_id, space_id, date, start_time, end_time, total_price, status, notes) VALUES
(2, 1, '2025-04-01', '09:00:00', '11:00:00', 300.00, 'confirmee',  'Reunion equipe'),
(3, 2, '2025-04-02', '10:00:00', '12:00:00', 60.00,  'confirmee',  'Travail individuel'),
(4, 3, '2025-04-03', '08:00:00', '10:00:00', 100.00, 'terminee',   'Entretien client'),
(5, 4, '2025-04-04', '14:00:00', '16:00:00', 200.00, 'confirmee',  'Formation'),
(6, 5, '2025-04-05', '09:00:00', '11:00:00', 60.00,  'annulee',    'Annule par membre'),
(7, 6, '2025-04-06', '11:00:00', '13:00:00', 180.00, 'en_attente', 'En attente confirmation');

-- ============================================================
-- PAYMENTS (6 paiements)
-- ============================================================
INSERT INTO payments (user_id, reservation_id, subscription_id, amount, method, status, payment_date, due_date, reference) VALUES
(2, 1, NULL, 300.00, 'carte',    'paye',       '2025-04-01 09:00:00', '2025-04-01', 'PAY-2025-001'),
(3, 2, NULL, 60.00,  'especes',  'paye',       '2025-04-02 10:00:00', '2025-04-02', 'PAY-2025-002'),
(4, 3, NULL, 100.00, 'virement', 'paye',       '2025-04-03 08:00:00', '2025-04-03', 'PAY-2025-003'),
(5, 4, NULL, 200.00, 'en_ligne', 'paye',       '2025-04-04 14:00:00', '2025-04-04', 'PAY-2025-004'),
(6, 5, NULL, 60.00,  'especes',  'rembourse',  '2025-04-05 09:00:00', '2025-04-05', 'PAY-2025-005'),
(7, 6, NULL, 180.00, 'carte',    'en_attente', NULL,                  '2025-04-06', 'PAY-2025-006');
-- ============================================================
-- image dans spaces(6 paiements)
-- ============================================================
UPDATE spaces SET image = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80' WHERE id = 1;
UPDATE spaces SET image = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' WHERE id = 2;
UPDATE spaces SET image = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' WHERE id = 3;
UPDATE spaces SET image = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80' WHERE id = 4;
UPDATE spaces SET image = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80' WHERE id = 5;
UPDATE spaces SET image = 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=1200&q=80' WHERE id = 6;