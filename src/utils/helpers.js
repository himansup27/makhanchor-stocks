// src/utils/helpers.js

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Converts a "packets.dabbas" value (e.g. 9.06 = 9 packets + 6 dabbas) into total dabbas.
// Rounds to 2 decimal places first to avoid float noise like 9.06 - 9 = 0.05999999999999872.
export const toTotalDabbas = (packetValue) => {
  const packets = Math.floor(packetValue);
  const decimalPart = Math.round((packetValue - packets) * 100) / 100;
  const dabbas = Math.round(decimalPart * 100); // .1 -> 10, .06 -> 6, .15 -> 15
  return packets * 16 + dabbas;
};

// Converts a total dabba count back into { packets, dabbas } for display.
export const fromTotalDabbas = (totalDabbas) => {
  const packets = Math.floor(totalDabbas / 16);
  const dabbas = totalDabbas % 16;
  return { packets, dabbas };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
};