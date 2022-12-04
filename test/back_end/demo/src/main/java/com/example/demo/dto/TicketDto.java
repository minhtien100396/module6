package com.example.demo.dto;

import com.example.demo.model.Garage;

import javax.validation.constraints.NotBlank;

public class TicketDto {
    private int id;
    @NotBlank(message = "Không được để trống")
    private String price;
    @NotBlank(message = "Không được để trống")
    private String localFrom;
    @NotBlank(message = "Không được để trống")
    private String localTo;
    @NotBlank(message = "Không được để trống")
    private String dayFrom;
    @NotBlank(message = "Không được để trống")
    private String hourFrom;
    @NotBlank(message = "Không được để trống")
    private String quantity;
    private int status;
    private Garage garage;

    public TicketDto() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getLocalFrom() {
        return localFrom;
    }

    public void setLocalFrom(String localFrom) {
        this.localFrom = localFrom;
    }

    public String getLocalTo() {
        return localTo;
    }

    public void setLocalTo(String localTo) {
        this.localTo = localTo;
    }

    public String getDayFrom() {
        return dayFrom;
    }

    public void setDayFrom(String dayFrom) {
        this.dayFrom = dayFrom;
    }

    public String getHourFrom() {
        return hourFrom;
    }

    public void setHourFrom(String hourFrom) {
        this.hourFrom = hourFrom;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Garage getGarage() {
        return garage;
    }

    public void setGarage(Garage garage) {
        this.garage = garage;
    }
}
