const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers('authrization');
    if (!auth) {
        return res.status(403).json({ message: 'Unathorized' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unathorized' });
    }
} 

module.exports= ensureAuthenticated;