import React, { useState, forwardRef, useImperativeHandle } from "react";
import { supabase } from "../../lib/supabase";
import GoogleAuth from "./GoogleAuth";
import "./auth.css";
import Background from '../../assets/icons/backgroundDesktop.svg?react'



type Props = {
  onSuccess?: (data: any) => void;
  hideSubmit?: boolean;
  onSwitch?: () => void;
  switchLabel?: string;
};

const Login = forwardRef<any, Props>(
  ({ onSuccess, hideSubmit, onSwitch, switchLabel }: Props, ref) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const doSubmit = async () => {
      setError(null);
      setLoading(true);
      try {
        const res = await supabase.auth.signInWithPassword({ email, password });
        if (res.error) throw res.error;
        onSuccess?.(res.data);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await doSubmit();
    };

    useImperativeHandle(ref, () => ({
      submit: doSubmit,
    }));

    return (
<div className="authWrap">

      <Background   className ="backgroundIcon"></Background>
      <div className="loginpage">
      <div className="loginHeader">
        <h2 className="loginTitle">InvestIQ</h2>
        <h3 className="loginSubTitle">Smart Finance</h3>
      </div>

      <div className="loginContainer">
        <div className="loginBody">
          <div className="googleSection">
            <p className="googleInfo">You can sign in using your Google account</p>
            <GoogleAuth />
          </div>

          <p className="loginHint">Or sign in with email and password after registration</p>

          <form onSubmit={handleSubmit} className="loginForm">
            <div className="formGroup">
              <label className="formLabel" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="formInput"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label className="formLabel" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="formInput"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="buttonRow">
              {!hideSubmit && (
                <>
                  <button type="submit" className="primaryButton" disabled={loading}>
                    {loading ? "Signing in…" : "SIGN IN"}
                  </button>
                  {onSwitch && (
                    <button type="button" onClick={onSwitch} className="secondaryButton">
                      {switchLabel || "SIGN UP"}
                    </button>
                  )}
                </>
              )}
            </div>

            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
  },
);

export default Login;
