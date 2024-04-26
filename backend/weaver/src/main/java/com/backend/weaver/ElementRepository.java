package com.backend.weaver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.backend.weaver.objects.Entry;
import com.backend.weaver.objects.Panel;
import com.backend.weaver.objects.PanelRow;

public class ElementRepository {
    private SqlStatements sqlStatements = new SqlStatements();
    private Boolean autoCommit;

    public ElementRepository(Boolean autoCommit) {
        this.autoCommit = autoCommit;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public List<Entry> getAllElementEntries(String worldId, String elementType) {
        try {
            System.out.println("Grab All Entries In " + elementType + " In World " + worldId + ".");
            // ResultSet results = statement.executeQuery(String.format(sqlStatements.grabAllFromTypeInElementsTable, worldId, elementType));
            Connection conn = sqlStatements.createConnection(autoCommit);
            ResultSet results = sqlStatements.executeStatementWithResults(conn, String.format(sqlStatements.grabAllFromTypeInElementsTable, worldId, elementType));
            List<Entry> entries = new ArrayList<>();
            if (results != null) {
                do {
                    if (results.getString("element_id") != null) {
                        Entry entry = new Entry(
                            results.getString("element_id"),
                            results.getString("element_name"),
                            elementType);
                        if (!entries.contains(entry)) {
                            entries.add(entry);
                        }
                    }
                } while (results.next());
            }
            System.out.println("Entries: " + entries);
            sqlStatements.closeConnection(conn);
            return entries;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Entry getSpecificElementEntry(String elementId) {
        try {
            System.out.println("Grab Content " + elementId + ".");
            // ResultSet results = statement.executeQuery(String.format(sqlStatements.grabSpecificInElementsTable, elementId));
            Connection conn = sqlStatements.createConnection(autoCommit);
            ResultSet results = sqlStatements.executeStatementWithResults(conn, String.format(sqlStatements.grabSpecificInElementsTable, elementId));
            if (results != null) {
                System.out.println(results.getString("element_id"));
                Entry entry = new Entry(
                    results.getString("element_id"),
                    results.getString("element_name"),
                    results.getString("element_type"));
                sqlStatements.closeConnection(conn);
                return entry;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String createElementEntry(String elementName, String elementType, String worldId) {
        UUID elementId = UUID.randomUUID();
        System.out.println("Create new content entry with id: " + elementId);
        // statement.executeUpdate(String.format(sqlStatements.addEntryIntoElementsTable, elementId, elementName, elementType, worldId));
        sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.addEntryIntoElementsTable, elementId, elementName, elementType, worldId));
        return elementId.toString();
    }

    public Boolean updateElementName(String newElementName, String elementId) {
        System.out.println("Update Element Entry");
        // statement.executeUpdate(String.format(sqlStatements.updateEntryNameInElementsTable, newElementName, elementId));
        return sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.updateEntryNameInElementsTable, newElementName, elementId));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public List<PanelRow> grabAllPanelRowsFromElement(String elementId) {
        System.out.println("Grab All Panel Rows from Element: " + elementId);
        try {
            // ResultSet results = statement.executeQuery(String.format(sqlStatements.grabAllRowsInElementFromElementPanelRowsTable, elementId));
            Connection conn = sqlStatements.createConnection(autoCommit);
            ResultSet results = sqlStatements.executeStatementWithResults(conn, String.format(sqlStatements.grabAllRowsInElementFromElementPanelRowsTable, elementId));
            List<PanelRow> rows = new ArrayList<>();
            if (results != null) {
                do {
                    if (results.getString("row_id") != null) {
                        PanelRow row = new PanelRow(
                            results.getString("row_id"),
                            results.getString("row_name"),
                            results.getInt("row_num"),
                            results.getString("element_id"));
                        if (!rows.contains(row)) {
                            rows.add(row);
                        }
                    }
                } while (results.next());
            }
            System.out.println("Panel Rows: " + rows);
            sqlStatements.closeConnection(conn);
            return rows;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public PanelRow createPanelRow(String rowName, int rowNum, String elementId) {
        System.out.println("Create Panel Row");
        UUID rowId = UUID.randomUUID();
        // statement.executeUpdate(String.format(sqlStatements.addRowIntoElementPanelRowsTable, rowId, rowName, rowNum, elementId));
        sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.addRowIntoElementPanelRowsTable, rowId, rowName, rowNum, elementId));
        return new PanelRow(rowId.toString(), rowName, rowNum, elementId);
    }
    
    public Boolean updatePanelRowName(String rowId, String rowName) {
        System.out.println("Update Panel Row Name");
        // statement.executeUpdate(String.format(sqlStatements.updateRowNameInElementPanelRowsTable, rowId, rowName));
        return sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.updateRowNameInElementPanelRowsTable, rowId, rowName));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public List<Panel> grabAllPanelsFromPanelRow(String rowId) {
        System.out.println("Grab All Panels from Panel Row: " + rowId);
        try {
            // ResultSet results = statement.executeQuery(String.format(sqlStatements.grabAllPanelsInRowFromElementPanelsTable, rowId));
            Connection conn = sqlStatements.createConnection(autoCommit);
            ResultSet results = sqlStatements.executeStatementWithResults(conn, String.format(sqlStatements.grabAllPanelsInRowFromElementPanelsTable, rowId));
            List<Panel> panels = new ArrayList<>();
            if (results != null) {
                do {
                    if (results.getString("panel_id") != null) {
                        Panel panel = new Panel(
                            results.getString("panel_id"),
                            results.getString("panel_name"),
                            results.getInt("panel_num"),
                            results.getString("panel_type"),
                            results.getString("row_id"),
                            results.getString("starred")
                        );
                        if (!panels.contains(panel)) {
                            panels.add(panel);
                        }
                    }
                } while (results.next());
            }
            System.out.println("Panels: " + panels);
            sqlStatements.closeConnection(conn);
            return panels;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    public Panel createPanel(String panelName, int panelNum, String panelType, String rowId, String starred) {
        System.out.println("Create Panel");
        UUID panelId = UUID.randomUUID();
        // statement.executeUpdate(String.format(sqlStatements.addPanelIntoElementPanelsTable, panelId, panelName, panelNum, panelType, rowId, starred));
        sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.addPanelIntoElementPanelsTable, panelId, panelName, panelNum, panelType, rowId, starred));
        return new Panel(panelId.toString(), panelName, panelNum, panelType, rowId, starred);
    }
}
