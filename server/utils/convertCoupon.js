function processCouponValue(coupon, orderTotal) {
  let processedValue = coupon;

  // Check if the value is in percentage format
  if (coupon.includes("%")) {
    // Remove the percentage sign and convert to number
    processedValue = Number(coupon.replace("%", ""));
    const total =
      Math.round(((1 - processedValue / 100) * orderTotal) / 1000) * 1000;
    return total;
  } else {
    // If the value is not in percentage format, assume it's a fixed amount
    processedValue = Number(coupon);
    const total = orderTotal - processedValue;
    return total;
  }
}

export default processCouponValue;
