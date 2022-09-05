import cookie from 'js-cookie'

// set cookie = create cookie from getter
// reponsiblilty of fuction is to take the name and value and saving it
export const setCookie = (key, value) => {
    if(typeof window !== 'undefined' ) { //
        cookie.set(key,value, {
            expires: '7d'
        })
    }
}

//remove from cookie
export const removeCookie = (key) => {
    if(typeof window !== 'undefined') { //
        cookie.set(key)
    }
}

// get from cookie such as stored token get = read cookie
//will be useful when we need to make a request to server with auth token
export const getCookie = () => {
    if(typeof window !== 'undefined')  {
        return cookie.get('token')
    }
}

// set in localstorage
export const setLocalStorage = (key, value) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}
// remove from localstorage
export const removeLocalStorage = (key) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstorage during   
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

// access user info from local storage 
export const isAuth = () => {
    if(typeof window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))

            } else {
                return false;             
            }
        }

    }
}