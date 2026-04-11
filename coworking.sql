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

-- ============================================================
-- DONNÉES DE TEST
-- ============================================================
INSERT INTO users (name, email, password, role) VALUES
('Administrateur', 'admin@coworking.ma', '$2y$10$exampleHashedPassword1234567890', 'admin');

INSERT INTO spaces (name, type, capacity, price_per_hour, description) VALUES
('Bureau Privé A',      'bureau',        1,  50.00, 'Bureau individuel calme avec vue'),
('Bureau Privé B',      'bureau',        1,  50.00, 'Bureau individuel équipé'),
('Salle Atlas',         'salle_reunion', 8, 150.00, 'Salle de réunion avec projecteur'),
('Salle Toubkal',       'salle_reunion',12, 200.00, 'Grande salle de conférence'),
('Espace Open Space 1', 'espace_ouvert',20,  30.00, 'Zone de travail collaboratif');