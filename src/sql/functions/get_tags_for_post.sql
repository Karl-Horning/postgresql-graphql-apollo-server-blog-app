-- Function: get_tags_for_post(postId_param INT)

-- Description: Retrieves tags associated with a given post ID.

-- Parameters:
--   postId_param: The ID of the post for which to retrieve tags.

-- Returns:
--   A table containing tag IDs and tag names associated with the specified post ID.

CREATE OR REPLACE FUNCTION get_tags_for_post(postId_param INT)
RETURNS TABLE (
    "tagId" INT,
    "tagName" VARCHAR
)
AS $$
BEGIN
    -- Query to retrieve tags associated with the given post ID
    RETURN QUERY
    SELECT
        t.tag_id AS "tagId",
        t.tag_name AS "tagName"
    FROM
        posts_tags AS pt
    LEFT JOIN
        tags AS t ON pt.tag_id = t.tag_id
    WHERE
        pt.post_id = postId_param;
END;
$$ LANGUAGE plpgsql;
