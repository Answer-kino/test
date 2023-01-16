const regExp__email =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/i;
const regExp__pwd =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
const regExp_phone = /^\d{2,3}-\d{3,4}-\d{4}$/;
export {regExp__pwd, regExp__email, regExp_phone};
