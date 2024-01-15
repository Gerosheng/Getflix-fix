import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/users')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  console.log('Data:', data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5050/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Form submitted successfully:', result)
      setData(result)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                <h3>Sign Up</h3>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="fname">First name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter first Name"
                    className="form-control"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="flname">Last name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter last Name"
                    className="form-control"
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold "
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <Link className="d-block text-center mt-2 small" to="/login">
                  Have an account? Sign In
                </Link>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
