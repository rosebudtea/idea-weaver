package com.backend.weaver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import com.backend.weaver.objects.World;

public class WorldRepository {

    private SqlStatements sqlStatements = new SqlStatements();
    private Boolean autoCommit;
    private final String BUFFER = "<buff>";

    public WorldRepository(Boolean autoCommit) {
        this.autoCommit = autoCommit;
    }

    public Boolean initialize() {
        System.out.println("Initialize Tables.");
        return sqlStatements.createTables(autoCommit);
    }

    public Boolean createWorld(String worldName) {
        System.out.println("Creating World " + worldName + ".");
        UUID worldId = UUID.randomUUID();
        // statement.executeUpdate(String.format(sqlStatements.createNewWorld, worldId, worldName));
        return sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.createNewWorld, worldId, worldName));
    }

    public Boolean addElementType(String worldId, String elementType) {
        System.out.println("Creating Element Type " + elementType + " in World " + worldId + ".");
        List<String> elementTypes = getAllElementTypes(worldId);
        System.out.println("Element Types: " + elementTypes + " " + elementType);
        elementTypes.add(elementType);
        System.out.println("Current Types: " + elementTypes.size());
        String types = String.join(BUFFER, elementTypes);
        System.out.println("Types: " + types);
        // statement.executeUpdate(String.format(sqlStatements.addElementTypeToWorld, types, worldId));
        return sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.addElementTypeToWorld, types, worldId));
    }

    public List<World> getAllWorlds() {
        try {
            System.out.println("Grabbing All Worlds.");
            // ResultSet results = statement.executeQuery(sqlStatements.grabAllFromWorldsTable);
            Connection conn = sqlStatements.createConnection(autoCommit);
            ResultSet results = sqlStatements.executeStatementWithResults(conn, String.format(sqlStatements.grabAllFromWorldsTable));
            List<World> worldsList = new ArrayList<>();
            if (results != null) {
                do {
                    String id = results.getString("world_id");
                    String name = results.getString("world_name");
                    World world = new World(id, name);
                    if (!worldsList.contains(world) && id != null) {
                        worldsList.add(world);
                    }
                } while (results.next());
            }
            sqlStatements.closeConnection(conn);
            return worldsList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> getAllElementTypes(String worldId) {
        try {
            System.out.println("Grabbing All Element Types from World " + worldId + ".");
            // ResultSet results = statement.executeQuery(String.format(sqlStatements.grabAllElementTypesFromWorld, worldId));
            Connection conn = sqlStatements.createConnection(autoCommit);
            ResultSet results = sqlStatements.executeStatementWithResults(conn, String.format(sqlStatements.grabAllElementTypesFromWorld, worldId));
            String result = results.getString("element_types");
            System.out.println("Results: " + result);
            List<String> elementTypes = new ArrayList<>();
            if (result != null && result.contains(BUFFER)) {
                elementTypes.addAll(Arrays.asList(result.split(BUFFER)));
            } else if (result != null) {
                elementTypes.addAll(Arrays.asList(result));
            }
            sqlStatements.closeConnection(conn);
            return elementTypes;
        } catch (SQLException e) {
            e.printStackTrace();
            return null; 
        }
    }

    public Boolean deleteWorld(String worldId) {
        System.out.println("Deleting World " + worldId + ".");
        // statement.executeUpdate(String.format(sqlStatements.deleteFromWorldsTable, worldId));
        return sqlStatements.executeStatementBoolean(autoCommit, String.format(sqlStatements.deleteFromWorldsTable, worldId));
        // TODO: update delete to include everything from the elements tables
    }

    public Boolean deleteTables() {
        System.out.println("Deleting All Tables.");
        return sqlStatements.deleteTables(autoCommit);
    }
}
