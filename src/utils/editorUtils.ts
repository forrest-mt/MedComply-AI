
// Simple debounce function
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Convert Markdown headings to HTML
export const processMarkdown = (text: string) => {
  // Process headings
  let processedText = text
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.*?)$/gm, '<h4>$1</h4>');

  // Process lists
  processedText = processedText
    .replace(/^\* (.*?)$/gm, '<li>$1</li>') // Unordered list items
    .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>'); // Ordered list items
  
  // Wrap list items in ul or ol tags
  // This is a simplified approach and would need more robust handling in a real app
  
  return processedText;
};
