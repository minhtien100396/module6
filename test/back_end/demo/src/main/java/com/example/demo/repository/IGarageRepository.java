package com.example.demo.repository;

import com.example.demo.model.Garage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGarageRepository extends JpaRepository<Garage,Integer> {
}
