import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/button/Button";
import { fields } from "../constants/formFields";

import type { SignupFormData } from "../types/formTypes";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Signup successful!");
      } else {
        toast.error(response.data.message || "Signup failed!");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.errors?.email?.msg ||
          "Something went wrong. Please try again.";
        toast.error("Error: " + errorMessage);
      } else if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-4 md:mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-center font-mono text-3xl font-semibold text-black mb-6">
        Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name as keyof SignupFormData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        ))}
        <Button loading={loading} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Signup;
