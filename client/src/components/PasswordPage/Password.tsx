import React, { useState } from 'react'
import './Password.css'

const PasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('https://viewtopia.onrender.com/api/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        // Password recovery initiated successfully, handle success (e.g., show a success message)
        console.log('Password recovery initiated successfully')
      } else {
        // Handle error (e.g., show an error message)
        console.error('Password recovery failed')
      }
    } catch (error) {
      console.error('An error occurred during password recovery:', error)
    }
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
                <h3>Recover Password</h3>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <label htmlFor="floatingInputEmail">Email address</label>
                </div>

                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    type="submit"
                  >
                    Recover
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage
