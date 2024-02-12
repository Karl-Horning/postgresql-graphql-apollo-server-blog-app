-- Start a new transaction
BEGIN;

-- Define parameters and insert data using a DO block
DO $$
DECLARE
    karl_id INTEGER;
    eva_id INTEGER;
    catia_id INTEGER;
    example_tag_id INTEGER;
    monkey_tag_id INTEGER;
    tests_tag_id INTEGER;
    testing_tag_id INTEGER;
BEGIN
-- Insert data into the users table
    INSERT INTO users (username, email, password_hash)
    VALUES 
        ('Karl', 'k.horning@me.com', 'Password123!'),
        ('Cátia', 'catia.horning@me.com', 'Password123!'),
        ('Eva', 'eva.horning@me.com', 'Password123!');

    -- Insert data into the tags table
    INSERT INTO
        tags (tag_name)
    VALUES
        ('example'),
        ('monkey'),
        ('tests'),
        ('testing');
        
    -- Get user IDs
    SELECT user_id INTO karl_id FROM users WHERE username = 'Karl';
    SELECT user_id INTO eva_id FROM users WHERE username = 'Eva';
    SELECT user_id INTO catia_id FROM users WHERE username = 'Cátia';

    -- Get tag IDs
    SELECT tag_id INTO example_tag_id FROM tags WHERE tag_name = 'example';
    SELECT tag_id INTO monkey_tag_id FROM tags WHERE tag_name = 'monkey';
    SELECT tag_id INTO tests_tag_id FROM tags WHERE tag_name = 'tests';
    SELECT tag_id INTO testing_tag_id FROM tags WHERE tag_name = 'testing';

    -- Insert data into the posts table
    INSERT INTO posts (title, content, author_id)
    VALUES
        ('My First Post', 'This is my first post!', karl_id),
        ('My Second Post', 'This is my second post!', karl_id),
        ('My Third Post', 'This is my third post!', karl_id),
        ('All About Monkeys', 'This is all about monkeys', eva_id),
        ('An Example Post', 'This is an example post', catia_id);

    -- Insert data into the posts_tags table
    INSERT INTO posts_tags (post_id, tag_id)
    VALUES
        ((SELECT post_id FROM posts WHERE title = 'My First Post'), example_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My First Post'), tests_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My First Post'), testing_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My Second Post'), example_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My Second Post'), tests_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My Second Post'), testing_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My Third Post'), example_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My Third Post'), tests_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'My Third Post'), testing_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'All About Monkeys'), example_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'All About Monkeys'), monkey_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'An Example Post'), example_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'An Example Post'), tests_tag_id),
        ((SELECT post_id FROM posts WHERE title = 'An Example Post'), testing_tag_id);
END;
$$;

-- Commit the transaction
COMMIT;
