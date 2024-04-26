package com.backend.weaver;

import org.springframework.web.bind.annotation.RestController;

import com.backend.weaver.objects.Entry;
import com.backend.weaver.objects.Panel;
import com.backend.weaver.objects.PanelRow;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class ElementController {
    private ElementRepository repository = new ElementRepository(false);

    private MultiValueMap<String, String> createHeaders() {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        return headers;
    }

    @GetMapping("/retrieveElementEntry")
    public ResponseEntity<Entry> getElementEntry(@RequestParam String elementId) {
        return new ResponseEntity<Entry>(repository.getSpecificElementEntry(elementId), createHeaders(), 200);
    }

    @GetMapping("/retrieveElementEntries")
    public ResponseEntity<List<Entry>> getAllElementEntries(@RequestParam String worldId, @RequestParam String elementType) {
        return new ResponseEntity<List<Entry>>(repository.getAllElementEntries(worldId, elementType), createHeaders(), 200);
    }

    @PostMapping("/createElementEntry")
    public ResponseEntity<String> createElementEntry(@RequestParam String elementName, @RequestParam String elementType, @RequestParam String worldId) {
        return new ResponseEntity<String>(repository.createElementEntry(elementName, elementType, worldId), createHeaders(), 200);
    }

    // @DeleteMapping("/delete")
    // public ResponseEntity<Boolean> deleteContent(@RequestParam String category, @RequestParam String contentId, @RequestParam String worldName) {
    //     return new ResponseEntity<Boolean>(repository.deleteContent(category, contentId, worldName), createHeaders(), 200);
    // }

    // @DeleteMapping("/deleteCategory")
    // public ResponseEntity<Boolean> deleteCategory(@RequestParam String worldName) {
    //     return new ResponseEntity<Boolean>(repository.deleteWorld(worldName), createHeaders(), 200);
    // }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/retrieveAllPanelRows")
    public ResponseEntity<List<PanelRow>> getAllPanelRows(@RequestParam String elementId) {
        return new ResponseEntity<List<PanelRow>>(repository.grabAllPanelRowsFromElement(elementId), createHeaders(), 200);
    }

    @PostMapping("/createPanelRow")
    public ResponseEntity<PanelRow> createPanelRow(@RequestParam String rowName, @RequestParam Integer rowNum, @RequestParam String elementId) {
        return new ResponseEntity<PanelRow>(repository.createPanelRow(rowName, rowNum, elementId), createHeaders(), 200);
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/retrieveAllPanels")
    public ResponseEntity<List<Panel>> getAllPanels(@RequestParam String rowId) {
        return new ResponseEntity<List<Panel>>(repository.grabAllPanelsFromPanelRow(rowId), createHeaders(), 200);
    }

    @PostMapping("/createPanel")
    public ResponseEntity<Panel> createPanel(@RequestParam String panelName, @RequestParam Integer panelNum, @RequestParam String panelType, @RequestParam String rowId, @RequestParam String starred) {
        return new ResponseEntity<Panel>(repository.createPanel(panelName, panelNum, panelType, rowId, starred), createHeaders(), 200);
    }
}
