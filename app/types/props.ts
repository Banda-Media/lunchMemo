import { UseFormMethods } from 'react-hook-form';
import { ILunchGroup } from '@typing/types';

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
  [x: string]: unknown;
}

export interface SelectGenericProps extends InputGenericProps {
  options: [string | number | number[] | string[], string][];
}

export interface InputProps {
  form: UseFormMethods<Record<string, unknown>>;
  hasLabel?: boolean;
  id?: string;
}

export interface TimePickerProps extends InputProps {
  prefix: string;
  [x: string]: unknown;
}

export interface TextInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder: string;
  autocomplete?: string;
  message: string;
  [x: string]: unknown;
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
  groups: ILunchGroup[];
}

export interface LunchGroupProps {
  group: ILunchGroup;
  hasDetailButton?: boolean;
}
