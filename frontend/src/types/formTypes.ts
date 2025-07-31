export interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface SignupPopupProps {
  handleSignupClick: () => void;
  setShowSignupPopup: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface loginFormData {
  email: string;
  password: string;
}

export interface ButtonProps {
  loading: boolean;
  onClick: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}

