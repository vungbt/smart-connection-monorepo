import { ButtonProps } from '.'; // Adjust path if needed

export const mockButtonProps: Record<string, ButtonProps> = {
  button: {
    variant: 'ghost',
    disabled: false,
    onClick: () => console.log('Button clicked'),
  },
  link: {
    variant: 'link',
  },
};
