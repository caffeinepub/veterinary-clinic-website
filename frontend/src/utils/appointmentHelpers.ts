export function generateAppointmentId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `appt-${timestamp}-${random}`;
}

export function generateServiceId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `svc-${timestamp}-${random}`;
}

/** Convert a JS Date to nanoseconds bigint (ICP Time) */
export function dateToTime(date: Date): bigint {
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

/** Convert ICP Time (nanoseconds bigint) to JS Date */
export function timeToDate(time: bigint): Date {
  return new Date(Number(time / BigInt(1_000_000)));
}

export function formatPrice(price: bigint): string {
  return `$${Number(price).toLocaleString()}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
