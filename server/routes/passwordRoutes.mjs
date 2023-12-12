import express  from "express";
import { passwordResetRequest, passwordReset } from "../controllers/passwordController.mjs";

const passwordRoutes = express.Router()


passwordRoutes.post("/forgot-password", passwordResetRequest)
passwordRoutes.put("/reset-password/:resetToken", passwordReset)

export default passwordRoutes;

/** This an example of how to integrate the resetToken in the request parameters in the front end.
 * 
 * 
    import React, { useEffect, useState } from 'react';

    const ResetPasswordPage = () => {
    const [resetToken, setResetToken] = useState('');

    useEffect(() => {
        // Get the resetToken from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        // Do something with the token (e.g., set it in state)
        setResetToken(token);
    }, []); // Run this effect once when the component mounts

    return (
        <div>
        <h2>Reset Password Page</h2>
        {//Your reset password form components and logic}
        <p>Reset Token: {resetToken}</p>
        </div>
    );
    };

    export default ResetPasswordPage;
    import axios from 'axios';

    // Assuming resetToken is retrieved as shown in the previous React example
    const resetToken = '...'; // Set your reset token here or get it dynamically

    const newPassword = '...'; // Set the new password here or get it from user input

    // Make a PUT request to your server endpoint with the reset token as a parameter
    axios.put(`http://localhost:5050/password/reset-password/${resetToken}`, {
    newPassword: newPassword,
    })
    .then(response => {
        // Handle the response from the server
        console.log(response.data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });

*/