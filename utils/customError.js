class CustomError extends Error{
    constructor(massage, code){
        super(massage)
        this.code = code
    }
}

module.exports = CustomError