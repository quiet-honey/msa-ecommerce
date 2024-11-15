package com.quiet_honey.order_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiet_honey.order_service.entity.Order;
import com.quiet_honey.order_service.repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order){
        return orderRepository.save(order);
    }

    public List<Order> findAllOrders(){
        return orderRepository.findAll();
    }
    
}
