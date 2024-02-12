-- Enable autocommit to start a new transaction
BEGIN;

-- Add function to get all of a user's posts and the tags for each post
CREATE OR REPLACE FUNCTION get_user_post_tag_info(user_id INTEGER)
RETURNS TABLE (
    username VARCHAR,
    email VARCHAR,
    title VARCHAR,
    tag_names VARCHAR
) AS $$
BEGIN
    -- Return all of a user's posts and the tags for each post
    RETURN QUERY
    SELECT
        u.username,
        u.email,
        p.title,
        STRING_AGG(t.tag_name, ', ')::VARCHAR AS tag_names
    FROM
        users AS u
    LEFT JOIN posts AS p ON
        p.author_id = u.user_id
    LEFT JOIN posts_tags AS pt ON
        pt.post_id = p.post_id
    LEFT JOIN tags AS t ON
        t.tag_id = pt.tag_id
    WHERE
        u.user_id = user_id
    GROUP BY
        u.username,
        u.email,
        p.title;
END;
$$ LANGUAGE plpgsql;

-- Commit the transaction
COMMIT;