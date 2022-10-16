/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Library;
import Service.LibraryService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Andres Rodriguez
 */
@RestController
@RequestMapping("/api/Lib")
public class LibraryController {
    @Autowired
    private LibraryService libraryService;

    // /api/Library/all
    @GetMapping("/all")
    public List<Library> getAll() {
        return libraryService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Library> getLibrary(@PathVariable("id") int id) {
        return libraryService.getLibrary(id);
    }

    // /api/Library/save
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Library save(@RequestBody Library library) {
        return libraryService.save(library);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Library update(@RequestBody Library library) {
        return libraryService.update(library);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int libraryId) {
        return libraryService.deleteLibrary(libraryId);
    }
}