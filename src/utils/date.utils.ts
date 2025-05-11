/**
 * Format a date to display how long ago it was in a readable format
 * @param dateString ISO date string to format
 * @returns Formatted string (e.g., "2 days ago", "5 months ago")
 */
export function formatDistanceToNow(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: 'year', seconds: 365 * 24 * 60 * 60 },
    { name: 'month', seconds: 30 * 24 * 60 * 60 },
    { name: 'day', seconds: 24 * 60 * 60 },
    { name: 'hour', seconds: 60 * 60 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value >= 1) {
      if (value === 1) {
        return unit.name === 'hour'
          ? `an ${unit.name} ago`
          : `a ${unit.name} ago`;
      }
      return `${value} ${unit.name}s ago`;
    }
  }

  return 'just now'; // fallback, though seconds >= 1 should cover all practical cases
}

/**
 * Format a date in a readable format (Oct 15, 2023)
 * @param dateString ISO date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
