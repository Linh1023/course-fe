export const validNoEmpty = (str: string): boolean => {
  
    if (str !== "") {
        return true
    }

    return false
}

export const validEmail = (str: string): boolean => {
    const regex: RegExp =/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
    
    if (regex.test(str)) {
        return true
    }

    return false
}

export const validBirthday = (str: string): boolean => {
    const regex: RegExp =  /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
    
    if (regex.test(str)) {
        return true
    }

    return false
}


