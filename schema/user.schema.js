import Joi from "joi"

const email = Joi.string()
.required()
.email({
  minDomainSegments: 2,
});

const password =Joi.string()
.required()
.min(8)
.max(35)
.alphanum()


export const userSignUp = Joi.object({
  email,
  password,
  /* .regex() */
  user: Joi.string().min(2).max(50),
  image: Joi.string().required().uri(),
  country: Joi.string().required(),
});

export const userSignIn = Joi.object({
  email,
  password
})
