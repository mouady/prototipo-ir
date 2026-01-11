import { query, validationResult } from 'express-validator';

export const validateDates = [
    query('startDate')
        .optional()
        .isISO8601()
        .withMessage('startDate debe ser una fecha válida en formato ISO8601'),
    
    query('endDate')
        .optional()
        .isISO8601()
        .withMessage('endDate debe ser una fecha válida en formato ISO8601')
        .custom((endDate, { req }) => {
            if (req.query.startDate && endDate) {
                const start = new Date(req.query.startDate);
                const end = new Date(endDate);
                if (start >= end) {
                    throw new Error('endDate debe ser posterior a startDate');
                }
            }
            return true;
        }),
    
    query('thresholdMs')
        .optional()
        .isInt({ min: 1 })
        .withMessage('thresholdMs debe ser un número entero positivo'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];