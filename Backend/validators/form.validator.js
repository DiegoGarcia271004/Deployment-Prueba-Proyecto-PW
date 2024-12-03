import { body, param } from "express-validator";
import mongoose from "mongoose";

export const addFormValidatorRules = [
    param("id")
        .notEmpty()
        .withMessage('Se requiere el ID del formulario')
        .isMongoId()
        .withMessage('Se requiere un ID de formulario valido'),
    body("question")
        .notEmpty()
        .withMessage('Se requiere agregar la pregunta al formulario'),
    body("order")
        .notEmpty()
        .withMessage('Se requiere un numero de orden')
        .isNumeric()
        .withMessage('Se requiere un numero de orden valido')
]

export const updateFormValidationRules = [
    param("id")
        .notEmpty()
        .withMessage('Se requiere el ID del formulario')
        .isMongoId()
        .withMessage('Se requiere un ID de formulario valido'),
    body("question")
        .notEmpty()
        .withMessage('Se requiere agregar la pregunta al formulario'),
    body("order")
        .notEmpty()
        .withMessage('Se requiere un numero de orden')
        .isNumeric()
        .withMessage('Se requiere un numero de orden valido')
]

export const deleteFormValidationRules = [
    param("id")
        .notEmpty()
        .withMessage('Se requiere el ID del formulario')
        .isMongoId()
        .withMessage('Se requiere un ID de formulario valido'),
    body('formsID')
        .notEmpty()
        .withMessage('Se requiere el ID de la pregunta a eliminar')
        .isMongoId()
        .withMessage('Se requiere un ID de pregunta de formulario valido'),
]