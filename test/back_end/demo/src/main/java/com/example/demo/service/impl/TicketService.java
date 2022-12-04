package com.example.demo.service.impl;

import com.example.demo.model.Ticket;
import com.example.demo.repository.ITicketRepository;
import com.example.demo.service.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService implements ITicketService {
    @Autowired
    private ITicketRepository ticketRepository;


    @Override
    public List<Ticket> findALlList() {
        return ticketRepository.findAllList();
    }

    @Override
    public void save(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    @Override
    public Optional<Ticket> findByIdTicket(int id) {
        return ticketRepository.findByIdTicket(id);
    }

//    @Override
//    public void delete(Ticket ticketDelete) {
//        ticketRepository.delete(ticketDelete);
//    }

    @Override
    public List<Ticket> search(String localFrom, String localTo, String dayFromFrom, String dayFromTo, String garageId) {
        return ticketRepository.search(localFrom, localTo, dayFromFrom, dayFromTo, garageId);
    }


    @Override
    public List<Ticket> searchNotDay(String localFrom, String localTo, String garageId) {
        return ticketRepository.searchNotDay(localFrom,localTo,garageId);
    }

    @Override
    public List<Ticket> searchNotDayFrom(String localFrom, String localTo, String dayFromTo, String garageId) {
        return ticketRepository.searchNotDayFrom(localFrom,localTo,dayFromTo,garageId);
    }

    @Override
    public List<Ticket> searchNotDayFromTo(String localFrom, String localTo, String dayFromFrom, String garageId) {
        return ticketRepository.searchNotDayFromTo(localFrom,localTo,dayFromFrom,garageId);
    }
}
