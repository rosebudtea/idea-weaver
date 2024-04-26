package com.backend.weaver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SqlStatements {
    public Connection createConnection(Boolean autoCommit) {
        try {
            Class.forName("org.sqlite.JDBC");
            Connection conn = DriverManager.getConnection(String.format ("jdbc:sqlite:%s", databaseName));
            conn.setAutoCommit(autoCommit);
            return conn;
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Boolean closeConnection(Connection conn) {
        try {
            conn.close();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean createTables(Boolean autoCommit) {
        try {
            Connection conn = createConnection(autoCommit);
            Statement statement = conn.createStatement();
            statement.executeUpdate(createWorldsTable);
            statement.executeUpdate(createElementsTable);
            statement.executeUpdate(createElementPanelRowsTable);
            statement.executeUpdate(createElementPanelsTable);
            conn.commit();
            conn.close();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public Boolean deleteTables(Boolean autoCommit) {
        try {
            Connection conn = createConnection(autoCommit);
            Statement statement = conn.createStatement();
            statement.executeUpdate(dropWorldsTable);
            statement.executeUpdate(dropElementsTable);
            statement.executeUpdate(dropElementPanelRowsTable);
            statement.executeUpdate(dropElementPanelsTable);
            conn.commit();
            conn.close();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public ResultSet executeStatementWithResults(Connection conn, String query) {
        try {
            Statement statement = conn.createStatement();
            ResultSet results = statement.executeQuery(query);
            return results;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Boolean executeStatementBoolean(Boolean autoCommit, String query) {
        try {
            Connection conn = createConnection(autoCommit);
            Statement statement = conn.createStatement();
            Boolean result = statement.execute(query); 
            conn.commit();
            conn.close();
            return result;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Worlds
        // world_id (UUID) | world_name (id) | element_types (list of strings)
    // Elements
        // element_id (UUID) | element_name (string) | element_type (string) | element_world (UUID)
    // Element Panel Rows
        // row_id (UUID) | row_name (string) | row_num (int) | element_id (UUID)
    // Element Panels
        // panel_id (UUID) | panel_name (string) | panel_num (int) | panel_type (string) | row_id (UUID) | starred (bool) | content (JSON)
    // Timelines
        // TBD
    // Outlines
        // TBD
    // Works
        // TBD
    public String databaseName = "test.db";
    public String worldsTable = "worlds";
    public String elementsTable = "elements";
    public String elementPanelRowsTable = "elementpanelrows";
    public String elementPanelsTable = "elementpanels";


    // CREATE TABLES
    public String createWorldsTable = "CREATE TABLE worlds " +
                                            "(world_id TEXT PRIMARY KEY NOT NULL UNIQUE," +
                                            " world_name TEXT NOT NULL," +
                                            " element_types TEXT);";
    public String createElementsTable = "CREATE TABLE elements " +
                                            "(element_id TEXT PRIMARY KEY NOT NULL UNIQUE," +
                                            " element_name TEXT NOT NULL," +
                                            " element_type TEXT NOT NULL," +
                                            " world_id TEXT NOT NULL);";
    public String createElementPanelRowsTable = "CREATE TABLE elementpanelrows " +
                                            "(row_id TEXT PRIMARY KEY NOT NULL UNIQUE," +
                                            " row_name TEXT NOT NULL," +
                                            " row_num INTEGER NOT NULL," +
                                            " element_id TEXT NOT NULL);";
    public String createElementPanelsTable = "CREATE TABLE elementpanels " +
                                            "(panel_id TEXT PRIMARY KEY NOT NULL UNIQUE," +
                                            " panel_name TEXT NOT NULL," +
                                            " panel_num INTEGER NOT NULL," +
                                            " panel_type TEXT NOT NULL," +
                                            " row_id TEXT NOT NULL," +
                                            " starred TEXT," + // This will be the element id if true and null if false
                                            " content BLOB);";


    // DROP TABLES
    public String dropWorldsTable = "DROP TABLE worlds;";
    public String dropElementsTable = "DROP TABLE elements;";
    public String dropElementPanelRowsTable = "DROP TABLE elementpanelrows;";
    public String dropElementPanelsTable = "DROP TABLE elementpanels;";


    // WORLDS TABLE
    public String createNewWorld = "INSERT INTO worlds (world_id, world_name) VALUES (\"%s\", \"%s\");";
    public String addElementTypeToWorld = "UPDATE worlds set element_types = \"%s\" WHERE world_id = \"%s\";";
    public String grabAllFromWorldsTable = "SELECT * FROM worlds;";
    public String grabAllElementTypesFromWorld = "SELECT * FROM worlds WHERE world_id = \"%s\";";
    public String deleteFromWorldsTable = "DELETE FROM worlds WHERE world_id = \"%s\";";


    // ELEMENTS TABLE
    public String grabAllFromTypeInElementsTable = "SELECT * FROM elements WHERE world_id = \"%s\" AND element_type = \"%s\";";
    public String grabSpecificInElementsTable = "SELECT * FROM elements WHERE element_id = \"%s\";";
    public String addEntryIntoElementsTable = "INSERT INTO elements (element_id, element_name, element_type, world_id) VALUES (\"%s\", \"%s\", \"%s\", \"%s\");";
    public String updateEntryNameInElementsTable = "UPDATE elements set element_name = \"%s\" WHERE element_id = \"%s\";";
    public String deleteFromElementsTable = "DELETE FROM elements WHERE element_id = \"%s\";";
    public String deleteFromElementsTableByWorld = "DELETE FROM elements WHERE world_id = \"%s\";";


    // ELEMENT PANEL ROWS TABLE
    public String grabAllRowsInElementFromElementPanelRowsTable = "SELECT * FROM elementpanelrows WHERE element_id = \"%s\";";
    public String grabSpecificRowFromElementsPanelRowsTable = "SELECT * FROM elementpanelrows WHERE row_id = \"%s\";";
    public String addRowIntoElementPanelRowsTable = "INSERT INTO elementpanelrows (row_id, row_name, row_num, element_id) VALUES (\"%s\", \"%s\", %s, \"%s\");";
    public String updateRowNameInElementPanelRowsTable = "UPDATE elementpanelrows set row_name = \"%s\" WHERE row_id = \"%s\";";
    public String deleteAllRowsInListFromElementPanelRowsTable = "DELETE FROM elementpanelrows WHERE element_id = \"%s\";";
    public String deleteSpecificFromElementPanelRowsTable = "DELETE FROM elementpanelrows WHERE row_id = \"%s\";";


    // ELEMENT PANELS TABLE
    public String grabAllPanelsInRowFromElementPanelsTable = "SELECT * FROM elementpanels WHERE row_id = \"%s\";";
    public String grabSpecificPanelFromElementsPanelsTable = "SELECT * FROM elementpanels WHERE panel_id = \"%s\";";
    public String addPanelIntoElementPanelsTable = "INSERT INTO elementpanels (panel_id, panel_name, panel_num, panel_type, row_id, starred) VALUES (\"%s\", \"%s\", %s, \"%s\", \"%s\", \"%s\");";
    public String updatePanelNameInElementPanelsTable = "UPDATE elementpanels set panel_name = \"%s\" WHERE panel_id = \"%s\";";
    public String updatePanelStarInElementPanelsTable = "UPDATE elementpanels set starred = \"%s\" WHERE panel_id = \"%s\";";
    public String updatePanelContentInElementPanelsTable = "UPDATE elementpanels set content = \"%s\" WHERE panel_id = \"%s\";";
    public String deleteAllPanelsInListFromElementPanelsTable = "DELETE FROM elementpanels WHERE row_id = \"%s\";";
    public String deleteSpecificPanelFromElementPanelsTable = "DELETE FROM elementpanels WHERE panel_id = \"%s\";";
}
