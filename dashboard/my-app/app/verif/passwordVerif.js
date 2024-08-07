export function validatePassword (password ,confirmPassword) {
    const errors = {}
    const messages = {

        password: 'Password must be at least 8 characters long',
        confirmPassword:'Passwords Do NOT match ! '
  
    }
    if (!password || password.length<8)
        {
            errors.password=messages.password;
        }
        if (!confirmPassword || password !== confirmPassword)
            {
                errors.password=messages.confirmPassword;
            }
        return errors ; 

}