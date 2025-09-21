import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { Sprout, Mail, Phone, MapPin, User, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    district: '',
    state: '',
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/auth/login",
  //       loginData,
  //       { withCredentials: true }
  //     );
  //     // Handle success (e.g., redirect)
  //     if (res.data) {
  //       navigate("/dashboard");
  //     }
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       setErrorMsg(err.response?.data?.message || "Login failed. Please try again.");
  //     } else {
  //       setErrorMsg("Unexpected error occurred during login.");
  //     }
  //   }
  //   setIsLoading(false);
  // };

  // const handleSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // Simple email and password format validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(signupData.email)) {
  //     setErrorMsg("Please enter a valid email address.");
  //     setIsLoading(false);
  //     return;
  //   }
  //   if (signupData.password.length < 6) {
  //     setErrorMsg("Password must be at least 6 characters.");
  //     setIsLoading(false);
  //     return;
  //   }
  //   if (signupData.password !== signupData.confirmPassword) {
  //     setErrorMsg("Passwords do not match.");
  //     setIsLoading(false);
  //     return;
  //   }

  //     // Phone number validation: must not start with 0-5
  //   const phoneRegex = /^[6-9]\d{9}$/;
  //   if (!phoneRegex.test(signupData.phone)) {
  //     setErrorMsg("Phone number must be 10 digits and start with 6, 7, 8, or 9.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/auth/signup",
  //       signupData,
  //       { withCredentials: true }
  //     );
  //     if (res.data) {
  //       setErrorMsg(null);
  //       navigate("/dashboard");
  //     }
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       setErrorMsg(err.response?.data?.message || "Signup failed. Please try again.");
  //     } else {
  //       setErrorMsg("Unexpected error occurred during signup.");
  //     }
  //   }
  //   setIsLoading(false);
  // };

  // const handleSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/auth/signup",
  //       signupData,
  //       { withCredentials: true }
  //     );
  //       if (res.data) {
  //         setErrorMsg("✅ Signup successful! You can login now.");
  //       }
  //     // Handle success (e.g., redirect or show message)
  //   } catch (err: unknown) {
  //       if (axios.isAxiosError(err)) {
  //         setErrorMsg(err.response?.data?.message || "Signup failed. Please try again.");
  //       } else {
  //         setErrorMsg("Unexpected error occurred during signup.");
  //       }
  //     }
  //     setIsLoading(false);

  //     const { error } = await signUp(signupData.email, signupData.password, {
  //       name: signupData.name,
  //       phone: signupData.phone,
  //       district: signupData.district,
  //       state: signupData.state,
  //     });

  //     if (!error) {
  //       // User will be redirected after email confirmation
  //     }

  //     setIsLoading(false);
  //   };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMsg(null);
  try {
    const res = await signIn(loginData.email, loginData.password); // useAuth context
    if (!res.error) {
      navigate("/dashboard");
    } else {
      setErrorMsg(res.error);
    }
  } catch (err) {
    setErrorMsg("Unexpected error occurred during login.");
  }
  setIsLoading(false);
};
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">FarmAssist</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Join the Farming Revolution</h1>
            <p className="text-muted-foreground mt-2">Access AI-powered farming advice and resources</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              {/* <TabsTrigger value="signup">Sign Up</TabsTrigger> */}
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email or Phone</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="text"
                          placeholder="Enter your email or phone"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <div className="text-center">
                      <Link to="#" className="text-sm text-primary hover:underline">
                        Forgot your password?
                      </Link>
                    </div>

                    <div className="text-center mt-4">
                      <Link to="/signup" className="text-primary hover:underline">
                        Don't have an account? Sign Up
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Signup Tab */}
            {/* <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join thousands of farmers using our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            placeholder="Your full name"
                            value={signupData.name}
                            onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={signupData.phone}
                            onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-state">State</Label>
                        <Select
                          value={signupData.state}
                          onValueChange={(value) => setSignupData(prev => ({ ...prev, state: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-district">District</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-district"
                            placeholder="Your district"
                            value={signupData.district}
                            onChange={(e) => setSignupData(prev => ({ ...prev, district: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create password"
                            value={signupData.password}
                            onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-confirm"
                            type="password"
                            placeholder="Confirm password"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;

function setErrorMsg(arg0: string) {
  throw new Error('Function not implemented.');
}
