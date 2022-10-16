/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Service;

import Model.Library;
import Repository.LibraryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Andres Rodriguez
 */
@Service
public class LibraryService {
    @Autowired
    private LibraryRepository libraryRepository;
    
    public List<Library> getAll(){
        return (List<Library>) libraryRepository.getAll();
    }
    
    public Optional<Library> getLibrary(int id){
        return libraryRepository.getLibrary(id);
    }
    
    public Library save(Library library){
        if(library.getId() ==null){
            return libraryRepository.save(library);
        } else {
            Optional<Library> libraryEncontrado = libraryRepository.getLibrary((int) library.getId());
            if(libraryEncontrado.isEmpty()){
                return libraryRepository.save(library);
            } else {
                return library;
            }
        }
    }
    
    public Library update(Library library){
        if(library.getId() != null){
            Optional<Library> libraryEncontrado = libraryRepository.getLibrary((int) library.getId());
            if(!libraryEncontrado.isEmpty()){
                if(library.getName() != null){
                    libraryEncontrado.get().setName(library.getName());
                }
                if(library.getTarget() != null){
                    libraryEncontrado.get().setTarget(library.getTarget());
                }
                if(library.getCapacity() != null){
                    libraryEncontrado.get().setCapacity(library.getCapacity());
                }
                if(library.getDescription() !=null){
                    libraryEncontrado.get().setDescription(library.getDescription());
                }
                if(library.getCategory() != null){
                    libraryEncontrado.get().setCategory(library.getCategory());
                }
                return libraryRepository.save(libraryEncontrado.get());
            }
        }
        return library;
    }
    
    public boolean deleteLibrary(int Id){
        Boolean resultado = getLibrary(Id).map(libraryPorEliminar ->{
            libraryRepository.delete(libraryPorEliminar);
            return true;
        }).orElse(false);
        
        return resultado;
    }

}
