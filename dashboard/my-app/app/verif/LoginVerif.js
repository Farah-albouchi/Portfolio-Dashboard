export function validateLogin(email,password)
{   const errors={}
    const messages=
    {
        email: "Please provide a Valid Email Address",
        password:"Please provide a Valid Password"
    }
    if (!email || !isValidEmail(email))
    {
        errors.email=messages.email;
    }
    if (!password || password.length<3)
    {
        errors.password=messages.password;
    }

    return errors;
}

export function isValidEmail(email) {
    const emailRegex= /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }
