const express = require('express');
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');
const router = new express.Router();

const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account.js');

const multer = require('multer');
const upload = multer({
  limits : {
    fileSize : 1000000,
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error('Please upload img'));
    cb(undefined, true);
  },
})

router.post('/users/me/avatar', upload.single('upload'), async(req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width : 250, height : 250}).png().toBuffer()
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (err, req, res, next) => {
  res.status(400).send({err : err.message})
})

router.delete('/users/me/avatar', upload.single('upload'), async(req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
}, (err, req, res, next) => {
  res.status(400).send({err : err.message})
})

router.get('/users/:id/avatar', async(req, res) => {
  try{
    const user = await User.findById(req.params.id);

    if(!user || !user.avatar){
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar);
  }catch(e){
    res.status(404).send();
  }
})

router.post('/users/login', async(req, res) => {
    try{
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({
        user,
        token,
      });
    }catch(e){
      res.status(400).send();
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try{
      req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
      await req.user.save();

      res.send();
    }catch(e){
      res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
  try{
    req.user.tokens = [];
    await req.user.save();

    res.send();
  }catch(e){
    res.send(500).send();
  }
})

router.post('/users', async(req, res) => {
  const user = new User(req.body);

  try{
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  }catch(e){
    res.status(400).send(error);
  }
})
router.delete('/users/me', auth, async(req, res) => {
  try{
    sendCancelEmail(req.user.email, req.user.username);
    await req.user.remove();
    res.send(req.user);
  }catch(e){
    res.status(500).send(e);
  }
})
router.get('/users/me', async(req, res) => {
  res.send(req.user);
})

// router.get('/users/:id', async(req, res) => {
//   const _id = req.params.id;

//   try{
//     const user = await User.findById(_id);
//     if(!user)
//       return res.status(404).send();
//   }catch(e){
//     res.status(500).send();
//   }
  // User.findById(_id).then(user => {
  //   if(!user)
  //     return res.status(404).send();
  //   res.send(user);
  // }).catch(error => {
  //   res.status(500).send();
  // })
// })
router.patch('/users/me', auth, async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email'];

  const isValid = updates.every(update => allowedUpdates.includes(update));

  if(!isValid)
    return res.status(400).send({error : "invalid"});

  try{
    // const user = await User.findById(req.params.id);

    updates.forEach(update => {
      req.user[update] = req.body[update]
    })

    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true, });

    // if(!user)
    //   return res.status(404).send();
    
    res.send(req.user);
  }catch(e){
    res.status(400).send(e);
  }
})

module.exports = router;