package com.example.demo.controller;

import com.example.demo.model.Garage;
import com.example.demo.service.IGarageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/garage/v1")
public class GarageRestController {
    @Autowired
    private IGarageService garageService;

    @GetMapping
    public ResponseEntity<List<Garage>> getListGarage() {
        List<Garage> garageList = garageService.getList();
        if (garageList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(garageList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Garage> findById(@PathVariable(value = "id") int id) {
        Garage garage = garageService.findById(id);
        if (garage == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(garage, HttpStatus.OK);
    }
}
