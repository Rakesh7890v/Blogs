const BlogModel = require('./models/Blogs')
const LoginModel = require('./models/Login')
const ProfileModel = require('./models/Profile')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express()

const allowedOrigins = [
  'https://yourblogging.vercel.app',
  'https://yourblogging.vercel.app/login',
  'https://yourblogging.vercel.app/signup',
  'https://yourblogging.vercel.app/create',
  'https://yourblogging.vercel.app/blog'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

mongoose.connect('mongodb+srv://rishirakesh587:Rakesh.v109@cluster0.ybynxnt.mongodb.net/')
    .then(() => {
        console.log("DB is connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.get('/', (req,res) => {
    BlogModel.find({})
    .then(blogs => res.json(blogs))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    BlogModel.create(req.body)
    .then(blogs => res.json(blogs))
    .catch(err => res.json(err))
})

app.get('/getBlogs/:name', (req, res) => {
    const {name} = req.params;
    console.log(name)
    BlogModel.find({name: name})
    .then(user => {
        res.json(user);
        console.log(user);
    })
    .catch(err => console.log(err))
})

app.post('/signup', (req, res) => {
    LoginModel.create(req.body)
        .then(login => {
            const { name, email } = req.body;
            return ProfileModel.create({ name, email });
        })
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
});

app.post('/login', (req,res) => {
    const {email, pass} = req.body;
    LoginModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.pass === pass){
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record is existed");
        }
    })
})

app.get('/getProfile',(req, res) => {
    const email = req.query.email;
    ProfileModel.findOne({email: email})
    .then(profile => {res.json(profile)})
    .catch(err => res.json(err));
})

app.get('/getLike/:id', (req,res) => {
    const id = req.params.id;
    BlogModel.findById({_id: id})
    .then(likes => res.json(likes))
    .catch(err => res.json(err))
})

app.post('/setProfile', async (req, res) => {
    const email = req.body.uemail;
    const photo = req.body.photo;
    await ProfileModel.findOneAndUpdate({ email: email }, { photo: photo })
    .then(images => { 
        res.json(images)
    })
    .catch(err => res.json(err))
})

app.post('/updateLike/:id', (req, res) => {
    const id = req.params.id;
    const updatedLikes = req.body.like;
    console.log("Updated likes:",updatedLikes);
    BlogModel.findByIdAndUpdate({ _id: id }, { likes: updatedLikes })
    .then(likes => {res.json(likes)
    console.log(likes)})
    .catch(err => res.json(err))
});

app.listen(3005, () => {
    console.log('Server is Running')
})
