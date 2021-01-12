import { UseFormMethods } from 'react-hook-form';
import { LunchGroup } from '@typing/types';

export interface RegistrationFormLinkProps {
  prompt: string;
  linkText: string;
  url: string;
}

export interface MakerLinkProps {
  url: string;
  name: string;
}

export interface AuthActionsProps {
  logout: () => void;
}

export interface ListButtonLinkProps {
  click: () => void;
  label: string;
}

export interface ListItemLinkProps {
  url: string;
  label: string;
}

export interface InputGenericProps {
  form: UseFormMethods<Record<string, unknown>>;
  name: string;
  [x: string]: any;
}

export interface SelectGenericProps extends InputGenericProps {
  options: string[];
}

export interface InputProps {
  form: UseFormMethods<Record<string, unknown>>;
  hasLabel?: boolean;
}

export interface TimePickerProps extends InputProps {
  prefix: string;
  [x: string]: any;
}

export interface TextInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder: string;
  autocomplete?: string;
  message: string;
  [x: string]: any;
}
export interface PasswordInputProps {
  form: UseFormMethods<Record<string, unknown>>;
  newPassword?: boolean;
}

export interface IDelayedCloseProps {
  delay: number;
  message: string;
  timestamp: Date;
}

export interface MetaProps {
  title: string;
  desc: string;
  canonical: string;
  css: string;
  image: string;
  js: string;
}

export interface SubmitButtonProps {
  title: string;
  disabled?: boolean;
}

export interface NotificationBarContentsProps {
  message: string;
  onClick: () => void;
}

export interface LunchGroupsProps {
  groups: LunchGroup[];
}

export interface LunchGroupProps {
  group: LunchGroup;
}
