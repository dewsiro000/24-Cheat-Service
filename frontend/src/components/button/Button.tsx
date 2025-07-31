import type { ButtonProps  } from "../../types/formTypes";

const Button: React.FC<ButtonProps> = ({ loading, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full text-white p-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed 
        ${loading ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full mr-2"></span>
          Signing up...
        </span>
      ) : (
        "Signup"
      )}
    </button>
  );
}

export default Button;
