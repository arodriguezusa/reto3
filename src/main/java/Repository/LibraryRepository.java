/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Repository;

import Model.Library;
import Repository.CrudRepository.LibraryCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Andres Rodriguez
 */
@Repository
public class LibraryRepository {
    @Autowired
    private LibraryCrudRepository libraryCrudRepository;
    
    public List<Library> getAll(){
        return (List<Library>) libraryCrudRepository.findAll();
    }
    
    public Optional<Library> getLibrary(int id){
        return libraryCrudRepository.findById(id);
    }
    
    public Library save(Library library){
        return libraryCrudRepository.save(library);
    }
    
    public void delete(Library library){
        libraryCrudRepository.delete(library);
    }
}
