export interface ChatBubbleProps {
  text: string;
}

export function ChatBubble({ text }: ChatBubbleProps) {
  return `<div class='p-2 bg-gray-100 rounded'>${text}</div>`;
}
