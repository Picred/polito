export const isLogged = (req, res, next) => {
    if(req.isAuthenticated())
        next();
    else return res.status(401).json({error: "Unauthorized."});
}