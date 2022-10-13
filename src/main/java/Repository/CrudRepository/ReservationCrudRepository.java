/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Repository.CrudRepository;

import Model.Reservation;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Andres Rodriguez
 */
public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer>{
    
}
