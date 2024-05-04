import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (info.password !== info.repeatPassword) {
        setErrors({ passwordMatch: 'Passwords do not match.' });
        return;
      }
      const response = await axios.post('http://localhost:3000/api/register', info);
      console.log("response", response.data);
      
      if (response) {
        navigate('/fournisseur');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrors({ server: error.response.data.msg });
      } else {
        setErrors({ server: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <>
      <div className='container mt-5'>
        <style>{`
          .container {
            width: 400px;
            margin: 0 auto;
          }
          
          form {
            display: flex;
            flex-direction: column;
          }
          
          label {
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          input {
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          
          .error {
            color: red;
            margin-top: 5px;
          }
          
          .btn-primary {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .btn-primary:hover {
            background-color: #0056b3;
          }
        `}</style>
        <form onSubmit={handleSubmit}>
        <h1>Register</h1>

          <label>Username</label>
          <input type='text' placeholder='ecrire votre nom' name="username" id="username" onChange={handleChange} required />
          <label>Email</label>
          <input type='text' placeholder='ecrire votre email' name="email" id="email" onChange={handleChange} required />
          <label>Password</label>
          <input type='password' placeholder='ecrire votre mot de passe' name="password" id="password" onChange={handleChange} required />
          <label>Repeat password</label>
          <input type='password' placeholder='Reecrire votre mot de passe' name="repeatPassword" id="repeatPassword" onChange={handleChange} required />
          {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
          <button className='btn-primary' type='submit'>Register</button>
          {errors.server && <p className="error">{errors.server}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
