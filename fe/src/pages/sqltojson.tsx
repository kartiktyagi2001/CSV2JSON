import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function SQLtoJSON() {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // 5 seconds automatic redirect to home screen

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);


  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-cyan-950 text-white text-center px-4">
        
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">🚀 Coming Soon</h1>
          <p className="text-lg sm:text-xl mb-8">
            This feature is under development. Stay tuned!
          </p>
          <div className="text-sm text-white/70">Made with ❤️ by Arcbit</div>
        </div>

        <div className="bg-cyan-950 p-10">
          <Link to="/" className="text-white p-1 rounded-md bg-cyan-900 text-lg hover:underline hover:text-cyan-950 hover:bg-cyan-200">Home</Link>
      </div>
      </div>
    </div>
  );
}
