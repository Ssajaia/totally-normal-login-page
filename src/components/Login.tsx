import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePassword = (password: string): string | null => {
    if (!/(?=.*\d)/.test(password)) {
      return "Must contain at least one number.";
    }

    const numbers = password.match(/\d+/g)?.map(Number) || [];
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    if (sum !== 175) {
      return "The numbers in the password must sum to 175.";
    }

    if (
      !password.includes("Trump") &&
      !password.includes("Putin") &&
      !password.includes("Kamala")
    ) {
      return "Must include the name of a პროჭი political leader.";
    }

    if (!/🤣/u.test(password)) {
      return "Must contain my favorite emoji";
    }

    const words = password.split(" ");
    if (!words.some((word) => word === word.split("").reverse().join(""))) {
      return "Must contain at least one palindrome.";
    }

    if (
      !/(H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn)/.test(
        password
      )
    ) {
      return "Must contain a chemical element symbol.";
    }

    if (!username.split("").every((char) => password.includes(char))) {
      return "Password must contain every character that is in the username.";
    }

    if (!password.includes("f(x)=x^2 +3")) {
      return "Password must include function which i derive in calculus II when i was learning it'.";
    }

    if (!password.includes("1000")) {
      return "Password must include '8' in binary (1000).";
    }

    if (!password.startsWith("vardisferi vardi")) {
      return "Password must start with 'vardisferi vardi'.";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hello_friend") {
      setSuccess(true);
      setError("");
    } else {
      const errorMsg = validatePassword(password);
      if (errorMsg) {
        setError(errorMsg);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success ? (
          <Link
            to="/Secret"
            className="w-full bg-green-500 text-white py-2 rounded text-center block"
          >
            Proceed to Secret Page
          </Link>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
