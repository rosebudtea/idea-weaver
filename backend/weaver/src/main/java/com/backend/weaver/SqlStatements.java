package com.backend.weaver;

import java.util.Arrays;
import java.util.List;

public class SqlStatements {
    // Worlds
    // world_name (id)
    // Characters
    // name (id) | world_id | panel_content
    // Creatures
    // name (id) | world_id | panel_content
    // Groups
    // name (id) | world_id | panel_content
    // Items
    // name (id) | world_id | panel_content
    // Locations
    // name (id) | world_id | panel_content
    // Timelines
    // name (id) | world_id | panel_content
    // Outlines
    // name (id) | world_id | panel_content
    // Dialogue
    // name (id) | world_id | panel_content
    // Snippets
    // name (id) | world_id | panel_content
    // Works
    // name (id) | world_id | panel_content
    public String databaseName = "test.db";
    public String worldsTable = "worlds";
    public String contentTable = "content";
    public List<String> contentTableNames = Arrays.asList("characters", "creatures", "groups", "items", "locations", "timelines", "outlines", "dialogue", "snippets", "works");

    public String createWorldsTable = "CREATE TABLE worlds (world_name TEXT PRIMARY KEY NOT NULL UNIQUE, element_types TEXT);";
    public String createContentTable = "CREATE TABLE content " +
                                            "(content_id TEXT PRIMARY KEY NOT NULL UNIQUE," +
                                            " content_name TEXT NOT NULL," +
                                            " category TEXT NOT NULL," +
                                            " world_name TEXT NOT NULL," +
                                            " panel_content TEXT);";

    public String grabAllFromCategoryInContentTable = "SELECT * FROM content WHERE world_name = \"%s\" AND category = \"%s\";";
    public String grabSpecificFromCategoryInContentTable = "SELECT * FROM content WHERE content_id = \"%s\" AND world_name = \"%s\" AND category = \"%s\";";

    public String insertIntoContentTable = "INSERT INTO content (content_id, content_name, category, world_name) VALUES (\"%s\", \"%s\", \"%s\", \"%s\");";
    public String updateContentInContentTable = "UPDATE content set panel_content = \"%s\" WHERE content_id = \"%s\" AND world_name = \"%s\" AND category = \"%s\";";
    public String updateNameInContentTable = "UPDATE content set content_name = \"%s\" WHERE content_id = \"%s\" AND world_name = \"%s\" AND category = \"%s\";";
    public String deleteFromContentTable = "DELETE FROM content WHERE content_id = \"%s\" AND world_name = \"%s\" AND category = \"%s\";";
    public String deleteEverythingFromContentTable = "DELETE FROM content WHERE world_name = \"%s\";";

    public String grabAllFromWorldsTable = "SELECT * FROM worlds;";
    public String insertIntoWorldsTable = "INSERT INTO worlds (world_name) VALUES (\"%s\");";
    public String deleteFromWorldsTable = "DELETE FROM worlds WHERE world_name = \"%s\";";
    public String deleteFromTableByWorld = "DELETE FROM content WHERE world_name = \"%s\";";

    public String grabAllCategoriesFromWorld = "SELECT * FROM worlds WHERE world_name = \"%s\";";
    public String addCategoryToWorld = "UPDATE worlds set element_types = \"%s\" WHERE world_name = \"%s\";";

    public String dropWorldsTable = "DROP TABLE worlds;";
    public String dropContentTable = "DROP TABLE content;";
}
