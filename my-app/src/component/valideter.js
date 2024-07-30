export  default function Valideter (values){
    const errors = {}
    const em = '^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    const pass = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
    if (values.name === "") {
        return errors.name = " Fill the name filld"
    }
    else if (values.name.length < 5 || values.name.length > 10) {
        return errors.name = "the name value should be 5-10"
    }
    else {
        return errors.name = ""
    }

if (values.email === "") {
    return errors.name = " Fill the email filld"
}
else if (!em.test(values.email) ){
    return errors.email = "the in valid e mail  "
}
else {
    return errors.email = ""
}
if (values.password === "") {
    return errors.password = " Fill the password filld"
}
else if (!pass.test(values.password) ){
    return errors.password = "the in valid password  "
}
else {
    return errors.password = ""
}
 return errors;
}