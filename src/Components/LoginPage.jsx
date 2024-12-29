import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const sendOtp = () => {
    // Generate a mock OTP for testing
    const mockOtp = "123456";
    setGeneratedOtp(mockOtp);
    console.log(`OTP sent to: ${email}`);
    alert(`Mock OTP sent to ${email}: ${mockOtp}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      console.log(`OTP verified: ${otp}`);
      alert("OTP verified successfully!");
    } else {
      console.error("OTP verification failed.");
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};

export default LoginPage;
