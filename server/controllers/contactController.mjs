import sanitize from "sanitize-html";
import Contact from "../models/contactModel.mjs";
import responseHandler from "../util/handlers/responseHandlers.mjs";
import { parseError } from "../util/helpers.mjs";
import { contactFormValidation } from "../validations/contactFormValidation.mjs";

const submitContactForm = async (req, res) => {
    try {
        const { firstname, lastname, email, subject, message } = req.body;
        console.log({ firstname, lastname, email, subject, message })
        await contactFormValidation.validateAsync({ firstname, lastname, email, message });

        const sanitizedMessage = sanitize(message);
        console.log(sanitizedMessage)

        const contact = new Contact({
            firstname: firstname,
            lastname: lastname,
            email: email,
            subject: subject,
            message: sanitizedMessage
        });
        console.log(contact)
        await contact.save();

        responseHandler.created(res, contact)
    } catch (err) {
        responseHandler.error(res, parseError)
    }
};

const getContactMessages = async (req, res) => {
    try {
        const allContacts = Contact.find();
        responseHandler.ok(res, allContacts)
    } catch (err) {
        console.error('Error retrieving contacts:', err);
        responseHandler.error(res);
    }
};

const deleteContactMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        
        const deletedContactMessage = await Contact.findByIdAndDelete(messageId);

        if (!deletedContactMessage) {
            return responseHandler.notFound(res);
        }

        responseHandler.ok(res, deleteContactMessage);
    } catch (error) {
        console.error(error);
        responseHandler.error(res);
    }
};

export {
    submitContactForm,
    getContactMessages,
    deleteContactMessage,
}