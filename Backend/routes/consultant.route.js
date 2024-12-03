import express from 'express';
import {
    getAllConsultants, 
    addConsultantController,
    updateConsultantsController,
    deleteConsultantController
} from '../controllers/consultant.controller.js';
import { 
    addConsultantValidationRules,
    updateConsultantValidationRules,
    deleteConsultantValidationRules,
} from '../validators/consultants.validator.js';
import validate from '../middlewares/validation.middleware.js';
import { authenticate } from '../auth/authentication.js';
import { authorizeRole } from '../auth/autorizathion.js';
import { config } from '../config/config.js';

const consultantRouter = express.Router();

// Ruta para obtener todos los consultores
consultantRouter.get('/', authenticate, getAllConsultants); 
//El ID que se pasa es el del objeto que contiene el array completo de consultores
//ese ID siempre sera el mismo y se almacenara en sessionStorage en el frontend
//TODO funciona agregar un consultor
consultantRouter.post('/add/:id', authenticate, authorizeRole(config.role1), addConsultantValidationRules, validate, addConsultantController);
//TODO funciona actualizar consultores
consultantRouter.put('/update/:id', authenticate, authorizeRole(config.role1), updateConsultantValidationRules, validate, updateConsultantsController);
//TODO funciona eliminar un consultor
consultantRouter.delete('/delete/:id', authenticate, authorizeRole(config.role1), deleteConsultantValidationRules, validate, deleteConsultantController);

export default consultantRouter;
