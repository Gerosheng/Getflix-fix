import crypto from "crypto";
import User from '../models/userModel.mjs';
import { transporter, resetMailOptions } from "../util/email.mjs";
import responseHandler from "../util/handlers/responseHandlers.mjs";
import { emailValidation, passwordResetValidation } from "../validations/userValidation.mjs";
import { parseError } from "../util/helpers.mjs";

const passwordResetRequest = async (req, res) => {
    const { email } = req.body;
    try {
        await emailValidation.validateAsync({ email });

        const user = await User.findOne({ email });

        if (!user) {
            return responseHandler.notFound(res);
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // token expires in 1 hour
        await user.save({ validateBeforeSave: false }); // option to bypass requirements in the model

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`; // adjust to actual password reset page
        const mailOptions = resetMailOptions(user.email, resetLink);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending reset email:', error);
                return responseHandler.error(res);
            }
            console.log('Email sent: ' + info);
            responseHandler.ok(res, info);
        });
    } catch (error) {
        responseHandler.valError(res, parseError);
    }
};

const passwordReset = async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    try {
        await passwordResetValidation.validateAsync({ password });

        const user = await User.findOneAndUpdate(
            {
                resetPasswordToken: resetToken,
                resetPasswordExpires: { $gt: Date.now() },
            },
            {
                $set: {
                    password: password,
                },
                $unset: {
                    resetPasswordToken: 1,
                    resetPasswordExpires: 1,
                }
            },
            { new: true}
        );
        
        if (!user) {
            return responseHandler.unauthorize(res, 'Invalid or expired token');
        }

        responseHandler.ok(res, user.password);

    } catch (error) {
        console.error(error);
        responseHandler.valError(res, parseError);
    }
};

export {
    passwordReset,
    passwordResetRequest
}