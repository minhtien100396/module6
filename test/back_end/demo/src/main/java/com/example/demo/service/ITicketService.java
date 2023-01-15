package com.example.demo.service;

import com.example.demo.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ITicketService {
    List<Ticket> findALlList();

    void save(Ticket ticket);

    Optional<Ticket> findByIdTicket(int id);

//    void delete(Ticket ticketDelete);

    List<Ticket> search(String localFrom, String localTo, String dayFromFrom, String dayFromTo, String garageId);


    List<Ticket> searchNotDay(String localFrom, String localTo, String garageId);

    List<Ticket> searchNotDayFrom(String localFrom, String localTo, String dayFromTo, String garageId);

    List<Ticket> searchNotDayFromTo(String localFrom, String localTo, String dayFromFrom, String garageId);

    Page<Ticket> findAllPage(Pageable pageable);

    Page<Ticket> findAllPageAndSeach(String localFrom, String localTo, String dayFromFrom, String dayFromTo, String garageId, Pageable pageable);
}
