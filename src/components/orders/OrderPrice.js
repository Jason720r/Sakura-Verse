import { useEffect, useState } from "react"






  export const calculateTotalPrice =   (confirmedOrders, items) => {
 

    let totalPrice = 0;
    confirmedOrders.forEach((orderItem) => {
      const item = items.find((item) => item.id === orderItem.itemId);
      totalPrice += item.price * orderItem.quantity;
    });
    return totalPrice.toFixed(2);
  }

