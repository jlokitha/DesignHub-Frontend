import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { Input } from "../components/ui/Input.tsx";
import { Button } from "../components/ui/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import { loginUser } from "../reducers/User-slice.ts";

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const isAuthenticated = useSelector((state: RootState) => state.userReducer.isAuthenticated);
  const err = useSelector((state: RootState) => state.userReducer.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/')
    }
    if (err) {
      setError(err);
    }
  }, [isAuthenticated, err])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      dispatch(loginUser({
        email,
        password
      }))
      console.log('Login:', { email, password });
    } catch (err) {
      console.log(err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side shapes */}
          <div className="absolute -left-16 top-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute left-1/4 top-1/2 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute -left-8 bottom-1/4 w-56 h-56 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          {/* Center shapes */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-3000"></div>

          {/* Right side shapes */}
          <div className="absolute -right-16 top-1/3 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute right-1/4 top-1/4 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-1000"></div>
          <div className="absolute -right-8 bottom-1/4 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000"></div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center">
            <Code className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to DesignHub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-lg shadow-gray-200/50 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
              )}

              <Input
                  label="Email address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                  type="submit"
                  className="w-full rounded-sm"
                  isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;