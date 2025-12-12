import  { useState } from "react";
import Login from "./login";
import Signup from "./signup";


 function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
  
    <div className="h-screen flex justify-center items-center bg-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 font-bold ${
              isLogin ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 font-bold ${
              !isLogin ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"
            }`}
          >
            Signup
          </button>
        </div>

        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default App;