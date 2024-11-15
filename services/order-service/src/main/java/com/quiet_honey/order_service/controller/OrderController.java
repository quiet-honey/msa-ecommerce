package com.quiet_honey.order_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiet_honey.order_service.entity.Order;
import com.quiet_honey.order_service.service.OrderService;



@RestController
@RequestMapping("/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @GetMapping("/test")
    public String test() {
        return "order-service-test";
    }

    @GetMapping()
    public List<Order> findAllOrders() {
        Order testOrder = new Order(1L, 2, 19000, "SHIPPED");
        orderService.createOrder(testOrder);
        return orderService.findAllOrders();
    }
    
    
}
