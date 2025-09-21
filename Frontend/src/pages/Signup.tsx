import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    district: '',
    state: '',
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    // Password validation
    if (signupData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    // Phone number validation: must not start with 0-5
    // const phoneRegex = /^[6-9]\d{9}$/;
    // if (!phoneRegex.test(signupData.phone)) {
    //   setErrorMsg("Phone number must be 10 digits and start with 6, 7, 8, or 9.");
    //   return;
    // }
    if (!signupData.name.trim()) {
      setErrorMsg("Name is required.");
      return;
    }
    if (!signupData.district.trim()) {
      setErrorMsg("District is required.");
      return;
    }
    if (!signupData.state.trim()) {
      setErrorMsg("State is required.");
      return;
    }

    // Call context signUp
    const { error } = await signUp(
      signupData.email,
      signupData.password,
      {
        name: signupData.name,
        phone: signupData.phone,
        district: signupData.district,
        state: signupData.state,
      }
    );

    if (!error) {
      setErrorMsg(null);
      navigate("/dashboard");
    } else {
      setErrorMsg(error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join thousands of farmers using our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  placeholder="Your full name"
                  value={signupData.name}
                  onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={signupData.phone}
                  onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email Address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-state">State</Label>
                <select
                  id="signup-state"
                  value={signupData.state}
                  onChange={(e) => setSignupData(prev => ({ ...prev, state: e.target.value }))}
                  required
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select your state</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-district">District</Label>
                <Input
                  id="signup-district"
                  placeholder="Your district"
                  value={signupData.district}
                  onChange={(e) => setSignupData(prev => ({ ...prev, district: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create password"
                  value={signupData.password}
                  onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  placeholder="Confirm password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center mt-4">
                <Link to="/login" className="text-primary hover:underline">
                  Already have an account? Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;