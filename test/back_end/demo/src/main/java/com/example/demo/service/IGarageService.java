package com.example.demo.service;

import com.example.demo.model.Garage;

import java.util.List;

public interface IGarageService {
    List<Garage> getList();

    Garage findById(int id);
}
