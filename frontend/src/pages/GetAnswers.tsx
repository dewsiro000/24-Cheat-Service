import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import SignupPopup from "../components/ui/SignupPopup";
import { compressData, decompressData } from "../utils/compressionUtils";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const GetAnswers: React.FC = () => {
  const [solutions, setSolutions] = useState<string[]>([]);
  const [numbers, setNumbers] = useState(["", "", "", ""]);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newNumbers = [...numbers];
    newNumbers[index] = e.target.value;
    setNumbers(newNumbers);
    sessionStorage.setItem("numbers", JSON.stringify(newNumbers));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowSignupPopup(true);
      return;
    }

    const nums = numbers.map((num) => parseInt(num.trim()));

    if (new Set(nums).size !== nums.length) {
      toast.error("Please enter 4 unique numbers.");
      return;
    }

    try {
      const response = await axios.get<{ solutions: string[] }>(
        `${apiUrl}/api/v1/users/get-answers`,
        {
          params: { nums },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const result = response.data.solutions;

        if (result && result.length > 0) {
          setSolutions(result);
          const compressedResult = compressData(result);
          sessionStorage.setItem("solutions", compressedResult);
        } else {
          setSolutions(["No solutions found."]);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data || "Something went wrong. Please try again.";
        toast.error(`Error: ${errorMessage}`);
      } else if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Unknown error occurred");
      }
    }
  };

  const handleClear = () => {
    sessionStorage.removeItem("solutions");
    sessionStorage.removeItem("numbers");

    setSolutions([]);
    setNumbers(["", "", "", ""]);
  };

  const handleSignupClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    const getData = (key: string, isCompressed: boolean = false) => {
      const data = sessionStorage.getItem(key);
      if (data) {
        return isCompressed ? decompressData(data) : JSON.parse(data);
      }
      return null;
    };

    setNumbers(getData("numbers") || ["", "", "", ""]);
    setSolutions(getData("solutions", true) || []);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-4 md:mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-3xl font-semibold text-blue-800 mb-8">
        24 Game Solver
      </h2>
      <h1 className="font-serif text-center text-black mb-10">
        Enter your 4 numbers below, then click "Solve" to see every solution
        that equals 24.
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 justify-center mb-6">
          {numbers.map((number, index) => (
            <input
              key={index}
              type="text"
              value={number}
              onChange={(e) => handleChange(e, index)}
              placeholder="0"
              maxLength={1}
              className="w-20 p-4 border-2 font-mono  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out text-center text-xl"
              required
            />
          ))}
        </div>
        <div className="flex gap-4 mx-4 md:mx-28 mt-1 md:mt-8">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white p-4 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
          >
            Solve
          </button>
          <button
            onClick={handleClear}
            className="w-1/2 bg-red-500 text-white p-4 rounded-lg mt-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
          >
            Clear Data
          </button>
        </div>
      </form>
      <div className="mt-7 font-mono">
        <h3 className="font-serif font-semibold text-lg text-gray-800 mb-4">Solutions:</h3>
        <h1 className="font-serif text-xl text-gray-800 mb-6">
          {solutions.length} solutions found ..
        </h1>
        <div className="space-y-4">
          {solutions && solutions.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="p-1 bg-gray-100  text-sm md:text-base  rounded-md shadow-sm border-l-4 border-gray-100 text-gray-700"
                >
                  {solution}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-gray-500">Answer ...</div>
          )}
        </div>
      </div>
      {showSignupPopup && (
        <SignupPopup
          handleSignupClick={handleSignupClick}
          setShowSignupPopup={setShowSignupPopup}
        />
      )}
    </div>
  );
};

export default GetAnswers;
