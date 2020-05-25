const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const Gallery = require('../models/image')
const User = require('../models/user')
const multer = require('multer')

const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/Gallery',(req,res)=>{
    res.render('index',{
        title:'Photo Sharing App',
        name: 'Jatin Kumar'
    })
})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

router.post('/gallery/uploadphoto', (req, res) => {
    console.log(req)
    let upload = multer({ storage: storage }).single('myFile');

    upload(req, res, function(err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        else{
            var img = new Gallery({
                    imageName: req.body.imageName,
                    description: req.body.imageDescription,
                    uploadedBy: req.user._id,
                    photo: req.body.file.filename
                })
                img.save((err,res)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.send('Photo Uploaded Successfully.')
                    }
                })
        }
    });
    // var img = req.file
    // var encode_image = img.toString('base64');
    // var finalImg = {
    //   contentType: req.file.mimetype,
    //   image:  new Buffer.from(encode_image, 'base64')
    // };
    // 
})

router.get('/gallery/getPhotos', auth, async (req,res)=>{
    var userId = mongoose.Types.ObjectId(req.query.userId)
    var photos = await Gallery.find({uploadedBy:userId}).populate({
        path:'photos'
    }).exec((err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(photos)
        }
    })
})

router.post('/gallery/sharePhoto',auth, async (req,res)=>{
    var toUserEmail = req.body.email
    var User = await User.find({email:toUserEmail})
    if(!User){
        res.send('User does not exists')
    }
    else{
        var photos = new Gallery({
            imageName:req.body.imageName,
            description:req.body.imageDescription,
            uploadedBy:User._id,
            sharedBy:req.user._id,
            photo:req.body.photo.path
        })
        await photos.save((err,res)=>{
            if(err) console.log(err)
            else{
                res.send('Photo Send Successfully.')
            }
        })
    }
})

module.exports = router