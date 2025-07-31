import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { fields } from "../constants/formFields";
import type { loginFormData } from "../types/formTypes";
import { useAuth } from "../context/useAuth";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Login: React.FC = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: "",
  });

  const filteredFields = fields.filter(
    (field) => field.name === "email" || field.name === "password"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/signin`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        login(response?.data?.user);
        toast.success("Login successful!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Error: " + error.response?.data?.errors?.email?.msg ||
            "Something went wrong. Please try again."
        );
      } else if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Unknown error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-4 md:mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-center font-mono text-3xl font-semibold text-black mb-6">
        Signin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {filteredFields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name as keyof loginFormData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          Signin
        </button>
      </form>
    </div>
  );
};

export default Login;
