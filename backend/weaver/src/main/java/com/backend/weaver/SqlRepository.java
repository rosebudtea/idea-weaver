package com.backend.weaver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SqlRepository {

    private SqlStatements sqlStatements = new SqlStatements();
    private Connection conn;
    private Statement statement;
    private final String BUFFER = "<buff>";

    public SqlRepository(Boolean autoCommit) {
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(String.format("jdbc:sqlite:%s", sqlStatements.databaseName));
            conn.setAutoCommit(autoCommit);
            statement = conn.createStatement();
            System.out.println("Opened database.");
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Content> getAllContent(String category, String worldName) {
        try {
            System.out.println("Grab All Content In " + category + " In World " + worldName + ".");
            ResultSet results = statement.executeQuery(String.format(sqlStatements.grabAllFromCategoryInContentTable, worldName, category));
            List<Content> contentList = new ArrayList<>();
            if (results != null) {
                do {
                    if (results.getString("content_id") != null) {
                        System.out.println(results.getString("content_id"));
                        Content content = new Content(
                            results.getString("content_id"),
                            worldName,
                            category,
                            results.getString("content_name"),
                            results.getString("panel_content"));
                        System.out.println("Content List: " + contentList);
                        if (!contentList.contains(content)) {
                            System.out.println("Add");
                            contentList.add(content);
                        }
                    }
                } while (results.next());
            }
            System.out.println("Content: " + contentList);
            return contentList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Content getSpecificContent(String category, String contentId, String worldName) {
        try {
            System.out.println("Grab Content " + contentId + ".");
            ResultSet results = statement.executeQuery(String.format(sqlStatements.grabSpecificFromCategoryInContentTable, contentId, worldName, category));
            if (results != null) {
                return new Content(
                    contentId,
                    worldName,
                    category,
                    results.getString("content_name"),
                    results.getString("panel_content"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String createNewContentEntry(String category, String contentName, String worldName) {
        try {
            String contentId = createContentId(contentName, worldName);
            System.out.println("Create new content entry with id: " + contentId);
            statement.executeUpdate(String.format(sqlStatements.insertIntoContentTable, contentId, contentName, category, worldName));
            conn.commit();
            return contentId;
        } catch (SQLException e) {
            e.printStackTrace();
            return "";
        } 
    }

    private String createContentId(String contentName, String worldName) {
        return String.format("%s%s", removeNonLetters(contentName), removeNonLetters(worldName));
    }

    private String removeNonLetters(String stringToFormat) {
        String formattedString = new String();
        for (int i = 0; i < stringToFormat.length(); i++) {
            char c = stringToFormat.charAt(i);
            if (Character.isAlphabetic(c) || Character.isDigit(c)) {
                formattedString += c;
            }
        }
        return formattedString;
    }

    public Boolean updateContentEntry(String category, String contentId, String panelUpdate, String worldName) {
        try {
            System.out.println("Updating Content Panel for " + contentId + ".");
            statement.executeUpdate(String.format(sqlStatements.updateSpecificInContentTable, panelUpdate, contentId, worldName, category));
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<String> getAllWorlds() {
        try {
            System.out.println("Grabbing All Worlds.");
            ResultSet results = statement.executeQuery(sqlStatements.grabAllFromWorldsTable);
            List<String> worldsList = new ArrayList<>();
            if (results != null) {
                do {
                    String name = results.getString("world_name");
                    if (!worldsList.contains(name)) {
                        worldsList.add(name);
                    }
                } while (results.next());
            }
            return worldsList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> getAllCategories(String worldName) {
        try {
            System.out.println("Grabbing All Categories from World " + worldName + ".");
            ResultSet results = statement.executeQuery(String.format(sqlStatements.grabAllCategoriesFromWorld, worldName));
            String result = results.getString("element_types");
            System.out.println("Results: " + result);
            List<String> categories = new ArrayList<>();
            if (result != null && result.contains(BUFFER)) {
                categories.addAll(Arrays.asList(result.split(BUFFER)));
            } else if (result != null) {
                categories.addAll(Arrays.asList(result));
            }
            return categories;
        } catch (SQLException e) {
            e.printStackTrace();
            return null; 
        }
    }

    public Boolean createNewWorld(String worldName) {
        try {
            System.out.println("Creating World " + worldName + ".");
            statement.executeUpdate(String.format(sqlStatements.insertIntoWorldsTable, worldName));
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean createNewCategory(String worldName, String category) {
        System.out.println("Creating Category " + category + " in World " + worldName + ".");
        List<String> categories = getAllCategories(worldName);
        try {
            System.out.println("Categories: " + categories + " " + category);
            categories.add(category);
            System.out.println("Creating: " + categories.size());
            String cats = String.join(BUFFER, categories);
            System.out.println("Cats: " + cats);
            statement.executeUpdate(String.format(sqlStatements.addCategoryToWorld, cats, worldName));
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean initialize() {
        try {
            System.out.println("Initialize Tables.");
            statement.executeUpdate(sqlStatements.createWorldsTable);
            statement.executeUpdate(sqlStatements.createContentTable);
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean deleteContent(String category, String contentId, String worldName) {
        try {
            System.out.println("Deleting Content " + contentId + ".");
            statement.executeUpdate(String.format(sqlStatements.deleteFromContentTable, contentId, worldName, category));
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean deleteWorld(String worldName) {
        try {
            System.out.println("Deleting World " + worldName + ".");
            statement.executeUpdate(String.format(sqlStatements.deleteFromWorldsTable, worldName));
            statement.executeUpdate(String.format(sqlStatements.deleteEverythingFromContentTable, worldName));
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean deleteTables() {
        try {
            System.out.println("Deleting All Tables.");
            statement.executeUpdate(sqlStatements.dropWorldsTable);
            statement.executeUpdate(sqlStatements.dropContentTable);
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
