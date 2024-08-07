export function validateRegister ( email, password) {
    const errors = {}
    const messages = {
      
        email: 'Email must be a valid email address',
        password: 'Password must be at least 8 characters long',
      
    
    }
    if (!email ||!isValidEmail(email) ) {
        errors.email=messages.email;
    }
    if (!password || password.length<8)
        {
            errors.password=messages.password;
        }
        return errors ; 

}
export function isValidEmail(email) {
    const emailRegex= /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }