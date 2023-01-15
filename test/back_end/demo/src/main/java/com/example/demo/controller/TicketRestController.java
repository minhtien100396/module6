package com.example.demo.controller;

import com.example.demo.dto.TicketDto;
import com.example.demo.model.Ticket;
import com.example.demo.service.ITicketService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ticket/v1")
public class TicketRestController {
    @Autowired
    private ITicketService ticketService;

    @GetMapping
    public ResponseEntity<List<Ticket>> getListTicket() {
        List<Ticket> ticketList = ticketService.findALlList();
        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }

    @GetMapping("/pg")
    public ResponseEntity<Page<Ticket>> getListTicket(@RequestParam(value = "localFrom", defaultValue = "", required = false) String localFrom,
                                                      @RequestParam(value = "localTo", defaultValue = "", required = false) String localTo,
                                                      @RequestParam(value = "dayFromFrom", defaultValue = "", required = false) String dayFromFrom,
                                                      @RequestParam(value = "dayFromTo", defaultValue = "", required = false) String dayFromTo,
                                                      @RequestParam(value = "garageId", defaultValue = "", required = false) String garageId,
                                                      @PageableDefault(value = 3) Pageable pageable) {

//        Page<Ticket> ticketPage = ticketService.findAllPage(pageable);
        Page<Ticket> ticketPage = ticketService.findAllPageAndSeach(localFrom, localTo, dayFromFrom, dayFromTo, garageId, pageable);
        if (ticketPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> findByTicket(@PathVariable(value = "id") int id) {
        Optional<Ticket> ticketOptional = ticketService.findByIdTicket(id);
        if (ticketOptional.isPresent()) {
            Ticket ticket = ticketOptional.get();
            return new ResponseEntity<>(ticket, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Ticket>> search(@RequestParam(value = "localFrom", defaultValue = "", required = false) String localFrom,
                                               @RequestParam(value = "localTo", defaultValue = "", required = false) String localTo,
                                               @RequestParam(value = "dayFromFrom", defaultValue = "", required = false) String dayFromFrom,
                                               @RequestParam(value = "dayFromTo", defaultValue = "", required = false) String dayFromTo,
                                               @RequestParam(value = "garageId", defaultValue = "", required = false) String garageId) {
        List<Ticket> ticketList = ticketService.search(localFrom, localTo, dayFromFrom, dayFromTo, garageId);
        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }

    @GetMapping("/searchNotDayFrom")
    public ResponseEntity<List<Ticket>> searchNotDayFrom(@RequestParam(value = "localFrom", defaultValue = "", required = false) String localFrom,
                                                         @RequestParam(value = "localTo", defaultValue = "", required = false) String localTo,
                                                         @RequestParam(value = "dayFromTo", defaultValue = "", required = false) String dayFromTo,
                                                         @RequestParam(value = "garageId", defaultValue = "", required = false) String garageId) {
        List<Ticket> ticketList = ticketService.searchNotDayFrom(localFrom, localTo, dayFromTo, garageId);
        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }

    @GetMapping("/searchNotDayFromTo")
    public ResponseEntity<List<Ticket>> searchNotDayFromTo(@RequestParam(value = "localFrom", defaultValue = "", required = false) String localFrom,
                                                           @RequestParam(value = "localTo", defaultValue = "", required = false) String localTo,
                                                           @RequestParam(value = "dayFromFrom", defaultValue = "", required = false) String dayFromFrom,
                                                           @RequestParam(value = "garageId", defaultValue = "", required = false) String garageId) {
        List<Ticket> ticketList = ticketService.searchNotDayFromTo(localFrom, localTo, dayFromFrom, garageId);
        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }

    @GetMapping("/searchNotDay")
    public ResponseEntity<List<Ticket>> searchNotDay(@RequestParam(value = "localFrom", defaultValue = "", required = false) String localFrom,
                                                     @RequestParam(value = "localTo", defaultValue = "", required = false) String localTo,
                                                     @RequestParam(value = "garageId", defaultValue = "", required = false) String garageId) {
        List<Ticket> ticketList = ticketService.searchNotDay(localFrom, localTo, garageId);
        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity add(@Valid @RequestBody TicketDto ticketDto) {
        Ticket ticket = new Ticket();
            BeanUtils.copyProperties(ticketDto, ticket);
        ticketService.save(ticket);
        return new ResponseEntity(ticket, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") int id) {
        Optional<Ticket> ticketOptional = ticketService.findByIdTicket(id);
        if (!ticketOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//        ticketService.delete(ticketDelete);
        Ticket ticketDelete = ticketOptional.get();
        ticketDelete.setStatus(0);
        ticketService.save(ticketDelete);
        return new ResponseEntity(ticketDelete, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> update(@PathVariable(value = "id") int id,
                                         @RequestBody TicketDto ticketDto) {
        Optional<Ticket> ticketOptional = ticketService.findByIdTicket(id);
        if (!ticketOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Ticket ticket = ticketOptional.get();
        BeanUtils.copyProperties(ticketDto, ticket);
        ticketService.save(ticket);
        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
