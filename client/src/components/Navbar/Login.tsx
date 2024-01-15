import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { useAuth } from '../../contexts/authContext'
import './Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setLoginError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  //const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      console.log({email, password})
      const response = await fetch('https://viewtopia.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      console.log('Login successful. Data:', data)
      setLoginError(null);
      alert(`Login successful!, welcome ${data.firstname}` );
      navigate("/homepage")
      
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during login:', error.message)
      }

      setLoginError('Invalid email or password')
    } finally {
      setLoading(false)
    }

    //auth.getAuth

  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex">
              {/* Background image for card set in CSS! */}
            </div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                <h3>Login</h3>
              </h5>
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInputEmail">Email address</label>
                </div>
                <hr />
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
                <Link
                  className="d-block text-center mt-2 small"
                  to="/password-recovery"
                >
                  Forgot Password
                </Link>
                <hr className="my-4" />
                <Link className="d-block text-center mt-2 small" to="/signup">
                  Don't have an account? Sign Up
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
