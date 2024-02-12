-- Function: public.get_user_post_tag_info_by_user_id(user_id integer)

-- Summary: Returns information about posts authored by a specific user along with the associated tags.

-- Description: This function retrieves information about posts authored by a specific user, including the post titles and the tags associated with each post. It takes the user ID as input and returns a table containing the username, email, title of each post, and the corresponding tags as a comma-separated string.

-- Parameters:
-- user_id: An integer representing the ID of the user whose posts are to be retrieved.

-- Returns: 
-- A table with the following columns:
-- - username: The username of the user who authored the post.
-- - email: The email address of the user who authored the post.
-- - title: The title of the post.
-- - tag_names: A comma-separated string containing the names of tags associated with the post.

-- Language: PL/pgSQL

CREATE OR REPLACE FUNCTION public.get_user_post_tag_info_by_user_id(user_id integer)
 RETURNS TABLE(username character varying, email character varying, title character varying, tag_names character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Declare variables for error handling
    DECLARE
        err_context text;
    BEGIN
        -- Check if the user exists
        PERFORM 1
        FROM users AS u
        WHERE u.user_id = get_user_post_tag_info_by_user_id.user_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'User with ID % does not exist', user_id;
        END IF;

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
            u.user_id = get_user_post_tag_info_by_user_id.user_id -- use function parameter directly
        GROUP BY
            u.username,
            u.email,
            p.title;

    EXCEPTION
        WHEN others THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE EXCEPTION 'Error fetching user post tag info: %', SQLERRM || ' Context: ' || err_context;
    END;

END;
$function$;
