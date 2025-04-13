import Joi from "joi";

const supportFormJoiSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Please enter a valid 10-digit phone number",
    }),

  district: Joi.string().trim().required().messages({
    "any.required": "District is required",
    "string.empty": "District cannot be empty",
  }),

  loksabha: Joi.string().trim().required().messages({
    "any.required": "Lok Sabha is required",
    "string.empty": "Lok Sabha cannot be empty",
  }),

  vidansabha: Joi.string().trim().required().messages({
    "any.required": "Vidhan Sabha is required",
    "string.empty": "Vidhan Sabha cannot be empty",
  }),

  areaType: Joi.string().valid('rural', 'urban').required().messages({
    "any.required": "Area type is required",
    "string.empty": "Area type cannot be empty",
    "any.only": "Area type must be either rural or urban",
  }),

  // Rural specific fields - required only if areaType is rural
  block: Joi.when('areaType', {
    is: 'rural',
    then: Joi.string().trim().required().messages({
      "any.required": "Block is required for rural areas",
      "string.empty": "Block cannot be empty",
    }),
    otherwise: Joi.string().trim().optional().allow(''),
  }),

  gramPanchayat: Joi.when('areaType', {
    is: 'rural',
    then: Joi.string().trim().required().messages({
      "any.required": "Gram Panchayat is required for rural areas",
      "string.empty": "Gram Panchayat cannot be empty",
    }),
    otherwise: Joi.string().trim().optional().allow(''),
  }),

  // Urban specific field - required only if areaType is urban
  ward: Joi.when('areaType', {
    is: 'urban',
    then: Joi.string().trim().required().messages({
      "any.required": "Ward is required for urban areas",
      "string.empty": "Ward cannot be empty",
    }),
    otherwise: Joi.string().trim().optional().allow(''),
  }),

  problem: Joi.string().trim().required().messages({
    "any.required": "Problem description is required",
    "string.empty": "Problem description cannot be empty",
  }),

  status: Joi.string()
    .valid("pending", "in_progress", "resolved", "rejected")
    .default("pending")
    .messages({
      "any.only": 'Status must be one of: "pending", "in_progress", "resolved", "rejected"',
    }),

  submittedAt: Joi.date().default(() => new Date()),

  lastUpdated: Joi.date().default(() => new Date()),
});

export default supportFormJoiSchema;
