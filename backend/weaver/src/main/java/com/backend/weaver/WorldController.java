package com.backend.weaver;

import org.springframework.web.bind.annotation.RestController;

import com.backend.weaver.objects.World;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class WorldController {
    private WorldRepository repository = new WorldRepository(false);

    private MultiValueMap<String, String> createHeaders() {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        return headers;
    }

    @PostMapping("/createTables")
    public ResponseEntity<Boolean> postMethodName() {
        return new ResponseEntity<Boolean>(repository.initialize(), createHeaders(), 200);
    }

    @DeleteMapping("/deleteTables")
    public ResponseEntity<Boolean> deleteTables() {
        return new ResponseEntity<Boolean>(repository.deleteTables(), createHeaders(), 200);
    }

    @PostMapping("/createWorld")
    public ResponseEntity<Boolean> createWorld(@RequestParam String worldName) {
        return new ResponseEntity<Boolean>(repository.createWorld(worldName), createHeaders(), 200);
    }

    @PostMapping("/createElementType")
    public ResponseEntity<Boolean> addElementType(@RequestParam String worldId, @RequestParam String elementType) {
        return new ResponseEntity<Boolean>(repository.addElementType(worldId, elementType), createHeaders(), 200);
    }

    @GetMapping("/retrieveWorlds")
    public ResponseEntity<List<World>> getWorlds() {
        return new ResponseEntity<List<World>>(repository.getAllWorlds(), createHeaders(), 200);
    }

    @GetMapping("/retrieveElementTypes")
    public ResponseEntity<List<String>> getCategories(@RequestParam String worldId) {
        return new ResponseEntity<List<String>>(repository.getAllElementTypes(worldId), createHeaders(), 200);
    }

    @DeleteMapping("/deleteWorld")
    public ResponseEntity<Boolean> deleteWorld(@RequestParam String worldId) {
        return new ResponseEntity<Boolean>(repository.deleteWorld(worldId), createHeaders(), 200);
    }
}
