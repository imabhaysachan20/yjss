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

  ward: Joi.string().trim().required().messages({
    "any.required": "Ward is required",
    "string.empty": "Ward cannot be empty",
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
