-- Enable autocommit to start a new transaction
BEGIN;

-- Create the users table if it doesn't exist
CREATE TABLE
    IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_email ON users (email);

-- Create the posts table if it doesn't exist
CREATE TABLE
    IF NOT EXISTS posts (
        post_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES users (user_id) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_posts_author_id ON posts (author_id);

-- Create the comments table if it doesn't exist
CREATE TABLE
    IF NOT EXISTS comments (
        comment_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts (post_id) NOT NULL,
        author_id INTEGER REFERENCES users (user_id) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_comments_post_id ON comments (post_id);
CREATE INDEX idx_comments_author_id ON comments (author_id);

-- Create the tags table if it doesn't exist
CREATE TABLE
    IF NOT EXISTS tags (
        tag_id SERIAL PRIMARY KEY,
        tag_name VARCHAR(50) UNIQUE NOT NULL
    );

CREATE INDEX idx_tags_tag_name ON tags (tag_name);

-- Create the posts_tags table if it doesn't exist
CREATE TABLE
    IF NOT EXISTS posts_tags (
        post_id INTEGER REFERENCES posts (post_id) NOT NULL,
        tag_id INTEGER REFERENCES tags (tag_id) NOT NULL,
        CONSTRAINT unique_post_tag_combination UNIQUE (post_id, tag_id)
    );

CREATE INDEX idx_posts_tags_post_id ON posts_tags (post_id);
CREATE INDEX idx_posts_tags_tag_id ON posts_tags (tag_id);

-- Commit the transaction
COMMIT;
