package com.quiet_honey.order_service.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.quiet_honey.order_service.event.OrderCancelledEvent;
import com.quiet_honey.order_service.service.OrderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderConsumer {
    @Autowired
    private final OrderService orderService;

    @KafkaListener(topics = "order-cancelled", groupId = "order-service-group", containerFactory = "orderCancelledKafkaListenerContainerFactory")
    private void handleOrderCancelledEvent(OrderCancelledEvent event) {
        System.out.println("Order cancelled: " + event.toString());
        orderService.cancelOrder(event.getOrderId());
    }
}
