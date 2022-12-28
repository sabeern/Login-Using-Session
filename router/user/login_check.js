
const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
const {check,validationResult} = require('express-validator');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
function checkDetails(req,res,next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const alert=errors.array();
        res.render('login',{alert});
        return false;
    } 
    const admin_username = 'sabeer',admin_password = 123;
    const { username, password } = req.body;
    if(username == admin_username & password == admin_password) {
        req.session.user=username;
        res.redirect('/home');
    }else {
        const alert = [{msg : "Invalied username or password"}];
         res.render('login',{alert});
    }
    next();
}
router.post('/login',urlencodedParser,[check('username','Username required').ltrim().notEmpty(),
check('password','Password required').ltrim().notEmpty()],checkDetails,(req,res)=>{
    if(req.session.user) {
        res.redirect('/home');
    }
});

module.exports=router;