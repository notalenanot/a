export interface FoiaRequestOptions {
  agency: string;
  topic: string;
  dateRange: string;
  location: string;
  purpose?: string;
}

export function generateFoiaLetter(opts: FoiaRequestOptions): string {
  const { agency, topic, dateRange, location, purpose } = opts;
  return `Subject: Public Records Request\n\nTo Whom It May Concern,\n\nPursuant to the public records law of ${location}, I respectfully request records related to ${topic} from ${agency} for the period ${dateRange}.\n\n${purpose ? `${purpose}\n\n` : ''}Please provide the materials in electronic format if possible. I look forward to your response within the statutory deadline.\n\nSincerely,\n[Your Name]`;
}

import nodemailer from 'nodemailer';

export async function sendFoiaEmail(
  opts: FoiaRequestOptions & { recipient: string; from: string },
  transportOptions: nodemailer.TransportOptions
): Promise<void> {
  const transporter = nodemailer.createTransport(transportOptions);
  const letter = generateFoiaLetter(opts);

  await transporter.sendMail({
    from: opts.from,
    to: opts.recipient,
    subject: 'Public Records Request',
    text: letter,
  });
}
