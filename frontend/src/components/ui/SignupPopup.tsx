import type { SignupPopupProps} from '../../types/formTypes'

const SignupPopup: React.FC<SignupPopupProps> = ({
  handleSignupClick,
  setShowSignupPopup,
}) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 ">
      <div className="bg-white font-mono  p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <p className="mb-4">You need to signin to get the answers.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSignupClick}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mb-2"
          >
            Go to Sign in
          </button>
          <button
            onClick={() => setShowSignupPopup(false)}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 mb-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
