package com.quiet_honey.order_service.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.quiet_honey.order_service.event.OrderCancelledEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OrderConsumer {
    @KafkaListener(topics = "order-cancelled", groupId = "order-service-group", containerFactory = "orderCancelledKafkaListenerContainerFactory")
    private void handleOrderCancelledEvent(OrderCancelledEvent event) {
        System.out.println("Order cancelled: " + event.toString());
    }
}
