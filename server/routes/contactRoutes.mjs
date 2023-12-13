import Express  from "express";
import { submitContactForm, getContactMessages, deleteContactMessage } from '../controllers/contactController.mjs'
import userAuthenticate from '../util/userAuthenticate.mjs'
import userAuthorisation from '../util/userAuthorisation.mjs'

const contactRoutes = Express.Router();

contactRoutes.post('/submit', submitContactForm)
contactRoutes.get('/get-messages', userAuthenticate, userAuthorisation('admin'), getContactMessages)
contactRoutes.delete('/delete', userAuthenticate, userAuthorisation('admin'), deleteContactMessage)

export default contactRoutes