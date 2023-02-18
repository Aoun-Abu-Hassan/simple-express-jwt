const router = require('express').Router();
const { body } = require('express-validator');
const { signUp,signIn } = require('../controllers/auth');
const { isAuth } = require('../middlewares/isAuth');

router.post('/sign-up',[body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),body('password').isLength({min:8}).isStrongPassword().withMessage('Please enter a valid password')],signUp)
router.post('/sign-in',[body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),body('password').isLength({min:8}).isStrongPassword().withMessage('Please enter a valid password')],signIn)
router.post('/dashboard',isAuth,(req,res) => {
    res.status(200).json({
        message:'Authorized',
        data:req.user
    })
})
module.exports = router;