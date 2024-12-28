package com.quiet_honey.order_service.service;

import java.util.List;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiet_honey.order_service.entity.Order;
import com.quiet_honey.order_service.repository.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 직렬화용 ObjectMapper

    public OrderService(OrderRepository orderRepository, KafkaTemplate<String, String> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }

    public Order createOrder(Order order) {
        System.out.println("Order: " + order.toString());
        Order result = orderRepository.save(order);

        try {
            System.out.println("Result: " + result.toString());
            String jsonOrder = objectMapper.writeValueAsString(result); // JSON 직렬화
            kafkaTemplate.send("order-created", jsonOrder); // JSON 메시지 전송
            System.out.println("Order created and sent to Kafka: " + jsonOrder);
        } catch (JsonProcessingException e) {
        }

        return result;
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

}
