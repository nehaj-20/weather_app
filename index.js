const express = require("express");
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotesdb', { useNewUrlParser: true });
const UserSchema = new mongoose.Schema({
    Firstname: { type: String, required: [true, "Name must be at least 3 characters"], minlength: 1 },
    Lastname: { type: String, required: [true, "Name must be at least 3 characters"], minlength: 1 },
    Quote: { type: String, required: [true, "Quote must be at least 3 characters"], minlength: 1 }
}, { timestamps: true })
const User = mongoose.model('User', UserSchema);


const flash = require('express-flash');
app.use(flash());

app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/public', express.static("public"));


app.get('/', (req, res) => {
    res.render('quote');
})


app.get('/submission', (req, res) => {

    User.find()
        .then(userArray => res.render("submission", { users: userArray }))
        .catch(err => res.json(err));
});


app.post('/process', (req, res) => {

    const user = new User();
    user.Firstname = req.body.Firstname;
    user.Lastname = req.body.Lastname;
    user.Quote = req.body.Quote;
    user.save()
        .then(() => res.redirect('/submission'))
        .catch(err => {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});


app.listen(5000, function(req, res) {
    console.log("working at port 5000..");
});