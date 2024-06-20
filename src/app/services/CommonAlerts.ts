export const errorAlertButtons = [
  {
    text: 'Close',
    cssClass: 'alert-button-support',
  },
];
export const AlertButtons = [
  {
    text: 'Ok',
    cssClass: 'alert-button-confirm',
  },
];
export const ErrorModalConfig = {
  message: 'This is a generic modal component.',
  image: "../../assets/img/error.gif",
  buttonText: 'Close',
  animated: false,
  buttonClass: ['alert-button-try-again'],
  imageClass: ['error-image'],
  closeable:false,
}

export const SafetyCHeck = [
  {
    id: 1,
    text: 'minimumCharacter',
    checked: false
  },
  {
    id: 2,
    text: 'oneLowercase',
    checked: false
  },
  {
    id: 3,
    text: 'oneUppercase',
    checked: false
  },
  {
    id: 4,
    text: 'oneNumber',
    checked: false
  },
  {
    id: 5,
    text: 'oneSpecialChar',
    checked: false
  },
  {
    id: 6,
    text: 'isPasswordMatched',
    checked: false
  },
];
export const InfoModalConfig = {
  message: 'This is a generic modal component.',
  image: "../../assets/img/info.gif",
  buttonText: 'Close',
  animated: false,
  buttonClass: ['alert-button-try-again'],
  imageClass: ['info-image'],
  closeable:true,
}
export const SuccessModalConfig = {
  message: 'Success.',
  image: "../../assets/img/success.gif",
  buttonText: 'Close',
  animated: false,
  imageClass: ['info-image'],
  buttonClass: ['alert-button-try-again'],
  closeable:true,
  backdropDismiss: true
}
export const SupportModalConfig = {
  message: 'This is a generic modal component.',
  image: "../../assets/img/info.gif",
  buttonText: 'Close',
  animated: false,
  buttonClass: ['alert-button-try-again'],
  imageClass: ['info-image'],
  closeable:true,
}

export interface ModalConfig {
  title?: string;
  message: string;
  image: string;
  cssClass?: string;
  buttonText: string;
  animated: boolean;
  imageClass?: string[];
  buttonClass?: string[];
  closeable?:boolean;
}