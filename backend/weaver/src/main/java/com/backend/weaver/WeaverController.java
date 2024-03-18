package com.backend.weaver;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class WeaverController {

    private SqlRepository repository = new SqlRepository(false);

    private MultiValueMap<String, String> createHeaders() {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        return headers;
    }

    @GetMapping("/retrieve")
    public ResponseEntity<Content> getContent(@RequestParam String category, @RequestParam String contentId, @RequestParam String worldName) {
        return new ResponseEntity<Content>(repository.getSpecificContent(category, contentId, worldName), createHeaders(), 200);
    }

    @GetMapping("/retrieveAll")
    public ResponseEntity<List<Content>> getAllContent(@RequestParam String category, @RequestParam String worldName) {
        return new ResponseEntity<List<Content>>(repository.getAllContent(category, worldName), createHeaders(), 200);
    }

    @GetMapping("/retrieveWorlds")
    public ResponseEntity<List<String>> getWorlds() {
        return new ResponseEntity<List<String>>(repository.getAllWorlds(), createHeaders(), 200);
    }

    @GetMapping("/retrieveCategories")
    public ResponseEntity<List<String>> getCategories(@RequestParam String worldName) {
        return new ResponseEntity<List<String>>(repository.getAllCategories(worldName), createHeaders(), 200);
    }

    @PostMapping("/createWorld")
    public ResponseEntity<Boolean> createNewWorld(@RequestParam String worldName) {
        return new ResponseEntity<Boolean>(repository.createNewWorld(worldName), createHeaders(), 200);
    }

    @PostMapping("/createCategory")
    public ResponseEntity<Boolean> createNewCategory(@RequestParam String worldName, @RequestParam String category) {
        return new ResponseEntity<Boolean>(repository.createNewCategory(worldName, category), createHeaders(), 200);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewContent(@RequestParam String category, @RequestParam String name, @RequestParam String worldName) {
        return new ResponseEntity<String>(repository.createNewContentEntry(category, name, worldName), createHeaders(), 200);
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> updateContent(@RequestBody Content content) {
        return new ResponseEntity<Boolean>(repository.updateContentEntry(content.category(), content.id(), content.panelContent(), content.worldName()), createHeaders(), 200);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deleteContent(@RequestParam String category, @RequestParam String contentId, @RequestParam String worldName) {
        return new ResponseEntity<Boolean>(repository.deleteContent(category, contentId, worldName), createHeaders(), 200);
    }

    @DeleteMapping("/deleteWorld")
    public ResponseEntity<Boolean> deleteWorld(@RequestParam String worldName) {
        return new ResponseEntity<Boolean>(repository.deleteWorld(worldName), createHeaders(), 200);
    }

    @DeleteMapping("/deleteEverything")
    public ResponseEntity<Boolean> deleteTables() {
        return new ResponseEntity<Boolean>(repository.deleteTables(), createHeaders(), 200);
    }

    @PostMapping("/start")
    public ResponseEntity<Boolean> postMethodName() {
        return new ResponseEntity<Boolean>(repository.initialize(), createHeaders(), 200);
    }
}
