import { MouseEvent } from 'react';

import { ContactLink } from '@/ui/link/components/ContactLink';

const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
};

type EmailDisplayProps = {
  value: string | null;
};

export const EmailDisplay = ({ value }: EmailDisplayProps) =>
  value && validateEmail(value) ? (
    <ContactLink
      href={`mailto:${value}`}
      onClick={(event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
      }}
    >
      {value}
    </ContactLink>
  ) : (
    <ContactLink href="#">{value}</ContactLink>
  );
