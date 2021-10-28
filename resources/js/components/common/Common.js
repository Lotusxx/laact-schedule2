
export function zeroPadding(num){
    return ('0' + num).slice(-2);
}

export function cutString(str){
    return str.substr(0,8) + '...';
}