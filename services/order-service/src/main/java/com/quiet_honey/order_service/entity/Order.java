package com.quiet_honey.order_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private int quantity;

    private int price;

    private String status;


    public Order(Long productId, int quantity, int price, String status){
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
    }
}
