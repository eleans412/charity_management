CREATE TYPE connection_initiator AS ENUM ('charity', 'sponsor');
CREATE TYPE connection_status AS ENUM ('Requested', 'Accepted', 'Declined', 'Pending Review');
CREATE TYPE view_type AS ENUM ('default', 'no_connections', 'existing_connections'); 

-- Charities Table
CREATE TABLE charities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    custom_view view_type NOT NULL
    description TEXT, -- should this be required (maybe role of product owner to discern?)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Needs Registry Table
CREATE TABLE needs_registry (
    id SERIAL PRIMARY KEY,
    need_name VARCHAR(255) UNIQUE NOT NULL
);

-- Charity Needs Table
CREATE TABLE charity_needs (
    charity_id INTEGER NOT NULL,
    need_id INTEGER NOT NULL,
    PRIMARY KEY (charity_id, need_id),
    FOREIGN KEY (charity_id) REFERENCES charities(id) ON DELETE CASCADE,
    FOREIGN KEY (need_id) REFERENCES needs_registry(id) ON DELETE RESTRICT
);

-- Sponsors Table
CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sponsor Needs Table
CREATE TABLE sponsor_needs (
    sponsor_id INTEGER NOT NULL,
    need_id INTEGER NOT NULL,
    PRIMARY KEY (sponsor_id, need_id),
    FOREIGN KEY (sponsor_id) REFERENCES sponsors(id) ON DELETE CASCADE,
    FOREIGN KEY (need_id) REFERENCES needs_registry(id) ON DELETE RESTRICT
);

-- This table is most definitely able to be changed - this is just
-- my initial idea
-- Connections Table
CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    charity_id INTEGER NOT NULL,
    sponsor_id INTEGER NOT NULL,
    initiated_by connection_initiator NOT NULL,
    status connection_status NOT NULL,
    message TEXT,
    response_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (charity_id) REFERENCES charities(id) ON DELETE CASCADE,
    FOREIGN KEY (sponsor_id) REFERENCES sponsors(id) ON DELETE CASCADE
);
