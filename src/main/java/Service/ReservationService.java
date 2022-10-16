/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Service;

import Model.Reservation;
import Repository.CountClient;
import Repository.ReservationRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Andres Rodriguez
 */
@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    
    public List<Reservation> getAll(){
        return (List<Reservation>) reservationRepository.getAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }
    
    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation() ==null){
            return reservationRepository.save(reservation);
        } else {
            Optional<Reservation> reservationEncontrado = reservationRepository.getReservation((int) reservation.getIdReservation());
            if(reservationEncontrado.isEmpty()){
                return reservationRepository.save(reservation);
            } else {
                return reservation;
            }
        }
    }
    
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation() != null){
            Optional<Reservation> reservationEncontrado = reservationRepository.getReservation((int) reservation.getIdReservation());
            if(!reservationEncontrado.isEmpty()){
                if(reservation.getStartDate() != null){
                    reservationEncontrado.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate() != null){
                    reservationEncontrado.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus() != null){
                    reservationEncontrado.get().setStatus(reservation.getStatus());
                }
                return reservationRepository.save(reservationEncontrado.get());
            }
        }
        return reservation;
    }
    
    public boolean deleteReservation(int Id){
        Boolean resultado = getReservation(Id).map(reservationPorEliminar ->{
            reservationRepository.delete(reservationPorEliminar);
            return true;
        }).orElse(false);

        return resultado;

    }

    public Status getReservationStatusReport(){
        List<Reservation> completed = reservationRepository.getReservationByStatus("completed");
        List<Reservation> cancelled = reservationRepository.getReservationByStatus("cancelled");
        return new Status(completed.size(),cancelled.size());
    }

    public List<Reservation> informePeriodoTiempoReservas(String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date a = new Date();
        Date b = new Date();

        try{
            a = parser.parse(datoA);
            b = parser.parse(datoB);
        }catch(ParseException e){
            e.printStackTrace();
        }
        if(a.before(b)){
            return reservationRepository.informePeriodoTiempoReservas(a, b);
        }else{
            return new ArrayList<>();
        }
    }

    public List<CountClient> getTopClients(){
        return reservationRepository.getTopClient();
    }
}