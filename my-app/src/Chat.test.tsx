/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chat } from './Chat';

describe('Chat component', () => {
  beforeEach(() => {
    global.fetch = jest.fn() as any;
  });

  test('shows user and bot messages', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ joke: 'Very funny' }),
    });

    const user = userEvent.setup();
    render(<Chat />);

    const textbox = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(textbox, 'Tell me a joke');
    await user.click(sendButton);

    expect(screen.getByText('Tell me a joke')).toBeInTheDocument();
    expect(await screen.findByText('Very funny')).toBeInTheDocument();
  });
});
