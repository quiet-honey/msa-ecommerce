package com.quiet_honey.order_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class OrderCancelledEvent {
    private int orderId; // 주문 ID
    private int productId; // 제품 ID
    private String message; // 메시지 (에러 설명)
}
