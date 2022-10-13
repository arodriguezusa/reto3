/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Service;

import Model.Category;
import Repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Andres Rodriguez
 */
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<Category> getAll(){
        return (List<Category>) categoryRepository.getAll();
    }
    
    public Optional<Category> getCategory(Integer id){
        return categoryRepository.getCategory(id);
    }
    
    public Category save(Category category){
        if(category.getId() ==null){
            return categoryRepository.save(category);
        } else {
            Optional<Category> categoryEncontrado = categoryRepository.getCategory((int) category.getId());
            if(categoryEncontrado.isEmpty()){
                return categoryRepository.save(category);
            } else {
                return category;
            }
        }
    }
    
    public Category update(Category category){
        if(category.getId() != null){
            Optional<Category> categoryEncontrado = categoryRepository.getCategory(category.getId());
            if(!categoryEncontrado.isEmpty()){
                if(category.getDescription() != null){
                    categoryEncontrado.get().setDescription(category.getDescription());
                }
                if(category.getName() != null){
                    categoryEncontrado.get().setName(category.getName());
                }
                return categoryRepository.save(categoryEncontrado.get());
            }
        }
        return category;
    }
    
    public boolean deleteCategory(int Id){

        Boolean respuesta = getCategory(Id).map(categoryPorEliminar ->{
            categoryRepository.delete(categoryPorEliminar);
            return true;
        }).orElse(false);
        return respuesta;
    }


}
