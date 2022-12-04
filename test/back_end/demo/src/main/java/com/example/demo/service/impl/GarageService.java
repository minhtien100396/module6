package com.example.demo.service.impl;

import com.example.demo.model.Garage;
import com.example.demo.repository.IGarageRepository;
import com.example.demo.service.IGarageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarageService implements IGarageService {
    @Autowired
    private IGarageRepository garageRepository;

    @Override
    public List<Garage> getList() {
        return garageRepository.findAll();
    }

    @Override
    public Garage findById(int id) {
        return garageRepository.findById(id).orElse(null);
    }
}
