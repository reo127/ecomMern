

const isAdmin = async ( req, res, next) => {
    try {
        const { user } = req;
        if(user.role === "USER"){
            return res.status(400).json({massage: "User can't access this route"});
        }

        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {isAdmin};