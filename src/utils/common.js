
// 이메일 형식 유효성 체크
export function emailCheck(email){
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(!email_regex.test(email) && email.length < 30) return false;
    else return true;
}

// 이름 형식 유효성 체크
export function nameCheck(name){
    // 한글, 영어, 숫자만 가능
    const name_regex =  /^[가-힣a-zA-Z0-9]{2,15}$/;
    if(name_regex.test(name)) return true;
    else return false;
}

// 비밀번호 형식 유효성 체크
export function passwordCheck(password,password_check){
    // 8자~16자,대문자or소문자숫자+특수문자
    const pwd_regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,16}$/;
    if(pwd_regex.test(password) && password === password_check) return true;
    else return false;
}
