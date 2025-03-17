// Define an interface for key data
interface KeyData {
  KeyCode: number;
  KeyUp?: boolean;
  KeyDown?: boolean;
  Shift: boolean;
  CapsLock: boolean;
  Control: boolean;
  key: string;
}

export { KeyData };
