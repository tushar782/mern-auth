
const router = express.Router(); // Correctly initialize the router

// Define the signup route
router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 5000,
        },
        {
            name: "tv",
            price: 23000,
        }
    ])
});

module.exports = router;
