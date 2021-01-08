import { UseFormMethods } from 'react-hook-form';

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

export interface InputProps {
  form: UseFormMethods<Record<string, unknown>>;
}

export interface PasswordInputProps {
  form: UseFormMethods<Record<string, unknown>>;
  newPassword?: boolean;
}

export interface IDelayedCloseProps {
  delay: number;
  message: string;
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
