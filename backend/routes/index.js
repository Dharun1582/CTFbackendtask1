var express = require('express');
var router = express.Router();
const {User} = require("./../models");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


/* GET home page. */
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "dharunctf@gmail.com",
    pass: "qotadkfxrslgvmky",
  },
});


router.get('/confirmation/:token', async (req, res) => {
  try {
    const user= jwt.verify(req.params.token, "secretkey");
    await User.update({
       confirmed: true }, 
       { where: {mail:user.mail} 
      }).catch((err)=>{
        if(err){
          console.log(err);
        }
      })
      return res.redirect('http://localhost:3000/signin');
      
  } catch (e) {
    console.log(e);
    res.status(400).send({message:'error'});
  }

  return res.redirect('http://localhost:3000/signin');
});
router.post("/SignUp",function(req,res){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    Name:req.body.Name,
    mail:req.body.email,
    pass:hash,
    confirmed:false
  }).catch((err)=> {
    if(err){
      console.log(err);
      return res.status(400).send({
        message:"error"
      })
    }
  });

  return res.status(200).send({
    message:"signup sucessful"
  })
   
})


router.post("/SignIn",async function(req,res){
  const data=await User.findOne({where:{mail:req.body.email}});
  if(!data){
    return res.status(400).send({
      message:"Invalid mail"
    })
  }else if(!bcrypt.compareSync(req.body.password, data.dataValues.pass)){
    return res.status(400).send({
      message:"Invalid password"
    })
  }else if(!data.dataValues.confirmed){

    const mail=req.body.email;
    const user ={mail:mail};
    const accessToken=jwt.sign(user,"secretkey");
    const url = `http://localhost:3001/confirmation/${accessToken}`;
    transporter.sendMail({
      from: 'dharunctf@gmail.com',
      to: mail,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    },function (err, info) {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: 'Error sending mail!',
        });
      } else {
        console.log("SUCCESS");
        return res.status(200).send({
          message: 'Email sent successfully! If not found in Inbox, check Spam',
        });
      }
    });
    return res.status(400).send({
      message:"Please Confirm your email to login"
    })
  }else{
    return res.status(200).send({
      message:"Credentials correct",
      email:req.body.email
    })
  }
  

})

router.post('/sendMailForgot',async function (req,res){
  const data = req.body;
  const val=await User.findOne({where:{mail:data.email}});
  if (val == null) {
    return res.status(401).send({
      message: 'Email does not exist',
    });
  }
  else {
    const user={mail:data.email};
    const accessToken=jwt.sign(user,"secretkey");
    var mailOptions = {
      from: 'dharunctf@gmail.com',
      to: data.email,
      subject: 'OTP for Password Reset',
      html: `<h3>Greetings from CTF.!</h3><h2>For the User  : ${val.dataValues.Name}</h2><br/><b>The OTP for Password Reset is :</b><h1>${data.code}</h1>Do not share with others.Ignore the OTP, if you remember your Password.<br/><h3>Thank You!</h3>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: 'Error sending mail!',
        });
      } else {
        return res.status(200).send({
          message: 'Email sent successfully! If not found in Inbox, check Spam',
          token:accessToken
        });
      }
    });
  }
});



router.post('/updatePw', async function (req, res) {
  const data = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  User.update({pass:hash},{where:{mail:data.email}}).then( res =>{
    console.log(res);
    
  }).catch(e => {
    console.log(e);
  });

  return res.status(200).send({
    message:"Password changed successfully"
  })
  
});

const otpdata={};

router.post('/sendMailOTP',async function (req,res){
  const data = req.body;
  const val=await User.findOne({where:{mail:data.email}});
  const otp=Math.floor(1000 + Math.random() * 9000);
  otpdata[data.email]=otp;
  if (val == null) {
    return res.status(401).send({
      message: 'Email does not exist',
    });
  }
  else {
    const user={mail:data.email};
    var mailOptions = {
      from: 'dharunctf@gmail.com',
      to: data.email,
      subject: ' OTP confirmation',
      html: `<h3>Greetings from CTF.!</h3><h2>For the User  : ${val.dataValues.Name}</h2><br/><b>The OTP for Login is :</b><h1>${otp}</h1>Do not share with others.<br/><h3>Thank You!</h3>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: 'Error sending mail!',
        });
      } else {
        return res.status(200).send({
          message: 'Email sent successfully! If not found in Inbox, check Spam',
        });
      }
    });
  }
});



router.post('/checkOTP',async function (req,res){
  const data = req.body;
  const otp=otpdata[data.email];

  if(data.code==otp){
    return res.status(201).send({
      message:'Correct OTP'
    })
  }else{
    return res.status(301).send({
      message:"Wrong OTP"
    })
  }
  
});
module.exports = router;
