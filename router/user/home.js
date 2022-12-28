const express = require('express');
const router=express.Router();
router.get('/home',(req,res)=>{
    console.log(req.session.user);
    if(req.session.user){
        let student_details=[{name:'Sabeer Neyyan',course:'Bsc.Computer Science',batch:2019,ph1:'9605027896',ph2:'8925361526',pic:'sabeer.jpg'},
        {name:'Anees T',course:'Bsc.Mathematics',batch:2020,ph1:'7825361529',ph2:'852634152635',pic:'anees.jpg'},
        {name:'Fahiz KP',course:'Msc.Computer Science',batch:2017,ph1:'9625341628',ph2:'6526152489',pic:'fahiz.jpg'},
        {name:'Arun Krishna',course:'Bsc.Computer Science',batch:2022,ph1:'8526154236',ph2:'7521456895',pic:'arun.jpg'}];
        res.render('home',{student_details});
    }else {
        res.redirect('/');
    }
});
module.exports=router;