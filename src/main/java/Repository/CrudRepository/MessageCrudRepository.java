/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Repository.CrudRepository;

import Model.Message;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Andres Rodriguez
 */
public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
    
}
