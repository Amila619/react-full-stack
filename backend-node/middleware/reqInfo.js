require('dotenv').config()

const reqInfo = (req, res, next) => {

    const { url, method, body, params, headers } = req;

    const data = {
        path : `http://localhost:${process.env.PORT + url}`,
        method : method,
        body : body,
        params : params,	
        headers : headers,	
    }
    console.log(data);
    next()
}

module.exports = {
    reqInfo
}