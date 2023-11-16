interface AlertProps {
  message: string;
  variant: AlertVariants;
  handleClose?: () => void;
  showButton?: boolean;
}

export enum AlertVariants {
  warning = "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700",
  success = "bg-green-100 border-l-4 border-green-500 text-green-700",
  error = "bg-red-100 border-l-4 border-red-500 text-red-700",
  info = "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
}

const Alert = ({ message, variant, handleClose, showButton }: AlertProps) => {
  return (
    <div
      className={`flex flex-row justify-between items-center py-3 px-1 ${variant}`}
    >
      <span className="font-semibold">{message}</span>
      {showButton && (
        <button
          onClick={handleClose}
          className="bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
