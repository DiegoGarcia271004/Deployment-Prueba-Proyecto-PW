import express from 'express';
import { 
    getFormController,
    addFormController,
    updateFormController,
    deleteFormController
} from '../controllers/form.controller.js';
import { 
    addFormValidatorRules,
    updateFormValidationRules,
    deleteFormValidationRules
} from '../validators/form.validator.js';
import validate from '../middlewares/validation.middleware.js';
import { authenticate } from '../auth/authentication.js';
import { authorizeRole } from '../auth/autorizathion.js';
import { config } from '../config/config.js';

const formRouter = express.Router();

//TODO funciona ver todo el form
formRouter.get('/', authenticate, getFormController);
//TODO funciona agregar un nuevo form
formRouter.post('/add/:id', authenticate, authorizeRole(config.role1), addFormValidatorRules, validate, addFormController);
//TODO funciona actualizar los forms
formRouter.put('/update/:id', authenticate, authorizeRole(config.role1), updateFormValidationRules, validate, updateFormController);
//TODO funciona eliminar un form
formRouter.delete('/delete/:id', authenticate, authorizeRole(config.role1), deleteFormValidationRules, validate, deleteFormController);

export default formRouter;