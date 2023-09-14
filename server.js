if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const uploadsDir = path.join(__dirname, 'uploads');


if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


initializePassport(
    passport,
    async (username) => {
        try {
            const user = await logindata.findOne({ username: username });
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    },
    async (id) => {
        try {
            const user = await logindata.findById(id);
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return null;
        }
    }
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
).env
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb+srv://jsamaan:amaan123@cluster0.vz55wc0.mongodb.net/jsamaan?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const LoginData = mongoose.Schema({
    username: String,
    password: String,verified: {
        type: Boolean,
        default: false,
    },
    Advisor: [String],
    Crop: [String],
    Research: [String],
    Objectives:[String],
    Experiment1Year: [String],
    Experiment1Duration: [String],
    Experiment1Treatment: [String],
    Experiment1Data: [String],
    Experiment2Year: [String],
    Experiment2Duration: [String],
    Experiment2Treatment: [String],
    Experiment2Data: [String],
    Experiment3Year: [String],
    Experiment3Duration: [String],
    Experiment3Treatment: [String],
    Experiment3Data: [String],
    Experiment4Year: [String],
    Experiment4Duration: [String],
    Experiment4Treatment: [String],
    Experiment4Data: [String],
    Year: [String],
    Duration: [String],
    Treatment: [String],
    TreatmentDetailsP: [String],
    R11P: [String],
    R12P: [String],
    R13P: [String],
    R14P: [String],
    R15P: [String],
    R21P: [String],
    R22P: [String],
    R23P: [String],
    R24P: [String],
    R25P: [String],
    R31P: [String],
    R32P: [String],
    R33P: [String],
    R34P: [String],
    R35P: [String],
    Faculty:[String],
    CropRCM:[String],
    ResearchRCM:[String],
    ObjectivesRCM:[String],
    executionRCM:[String],
    DurationRCM:[String],
    TreatmentRCM:[String],
    TreatmentDetailsRCM: [String],
    R1RCM:[String],
    R2RCM:[String],
    R3RCM:[String],
    Principal:[String],
    CropEXT:[String],
    ResearchEXT:[String],
    ObjectivesEXT:[String],
    executionEXT:[String],
    DurationEXT:[String],
    TreatmentEXT:[String],
    TreatmentDetailsEXT:[String],
    TreatmentDetailsEXT0:[String],
    R1EXT:[String],
    R2EXT:[String],
    R3EXT:[String],
    R11EXT:[String],
    R12EXT:[String],
    R13EXT:[String],
    R14EXT:[String],
    R15EXT:[String],
    R21EXT:[String],
    R22EXT:[String],
    R23EXT:[String],
    R24EXT:[String],
    R25EXT:[String],
    R31EXT:[String],
    R32EXT:[String],
    R33EXT:[String],
    R34EXT:[String],
    R35EXT:[String],
    TreatmentDetailsRCM0:[String],
    R1RCM:[String],
    R2RCM:[String],
    R3RCM:[String],
    R11RCM:[String],
    R12RCM:[String],
    R13RCM:[String],
    R14RCM:[String],
    R15RCM:[String],
    R21RCM:[String],
    R22RCM:[String],
    R23RCM:[String],
    R24RCM:[String],
    R25RCM:[String],
    R31RCM:[String],
    R32RCM:[String],
    R33RCM:[String],
    R34RCM:[String],
    R35RCM:[String],
    ExecutionT: [String],
    DurationT: [String],
    TreatmentDT: [String],
    DataDT: [String],
    ExecutionTEXT: [String],
    DurationTEXT: [String],
    TreatmentDTEXT: [String],
    DataDTEXT: [String],
    ExecutionTRCM: [String],
    DurationTRCM: [String],
    TreatmentDTRCM: [String],
    DataDTRCM: [String],
    uploadedFile: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number,
    },

});

const logindata = mongoose.model('LoginData1', LoginData);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const absolutePath = path.join(__dirname, 'uploads');
        cb(null, absolutePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage: storage });
var array;

app.get('/', function (req, res) {
    logindata.find({})
    .then(found => {
    })
    res.render('index.ejs', { name: "Syed Amaan {Date}"});
});

app.get('/login', function (req, res) {
    res.render('login', {req: req,topic: array});
});

app.get('/register', function (req, res) {
    res.render('register.ejs');
});

app.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new logindata({
            username: username,
            password: hashPassword,
        });
        newUser.save();
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});


app.get('/ExternallyFundedProject', async (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Principal = req.user.Principal;
        const CropEXT = req.user.CropEXT;
        const ResearchEXT = req.user.ResearchEXT;
        const ObjectivesEXT = req.user.ObjectivesEXT;
        const executionEXT = req.user.executionEXT;
        const DurationEXT = req.user.DurationEXT;
        const TreatmentEXT = req.user.TreatmentEXT;
        const TreatmentDetailsEXT = req.user.TreatmentDetailsEXT;
        const TreatmentDetailsEXT0 = req.user.TreatmentDetailsEXT0;
        const R1EXT = req.user.R1EXT;
        const R2EXT = req.user.R2EXT;
        const R3EXT = req.user.R3EXT;
        const R11EXT = req.user.R11EXT;
        const R12EXT = req.user.R12EXT;
        const R13EXT = req.user.R13EXT;
        const R14EXT = req.user.R14EXT;
        const R15EXT = req.user.R15EXT;
        const R21EXT = req.user.R21EXT;
        const R22EXT = req.user.R22EXT;
        const R23EXT = req.user.R23EXT;
        const R24EXT = req.user.R24EXT;
        const R25EXT = req.user.R25EXT;
        const R31EXT = req.user.R31EXT;
        const R32EXT = req.user.R32EXT;
        const R33EXT = req.user.R33EXT;
        const R34EXT = req.user.R34EXT;
        const R35EXT = req.user.R35EXT;
        const ExecutionTEXT = req.user.ExecutionTEXT;
        const DurationTEXT = req.user.DurationTEXT;
        const TreatmentDTEXT = req.user.TreatmentDTEXT;
        const DataDTEXT = req.user.DataDTEXT;
        try {
            res.render("ExternallyFundedProject.ejs", {
                username: username,
                Principal: Principal,
                CropEXT: CropEXT,
                ResearchEXT: ResearchEXT,
                ObjectivesEXT: ObjectivesEXT,
                executionEXT: executionEXT,
                DurationEXT: DurationEXT,
                TreatmentEXT: TreatmentEXT,
                TreatmentDetailsEXT: TreatmentDetailsEXT,
                TreatmentDetailsEXT0:TreatmentDetailsEXT0,
                R1EXT: R1EXT,
                R2EXT: R2EXT,
                R3EXT: R3EXT,
                R11EXT: R11EXT,
                R12EXT: R12EXT,
                R13EXT: R13EXT,
                R14EXT: R14EXT,
                R15EXT: R15EXT,
                R21EXT: R21EXT,
                R22EXT: R22EXT,
                R23EXT: R23EXT,
                R24EXT: R24EXT,
                R25EXT: R25EXT,
                R31EXT: R31EXT,
                R32EXT: R32EXT,
                R33EXT: R33EXT,
                R34EXT: R34EXT,
                R35EXT: R35EXT,
                ExecutionTEXT: ExecutionTEXT,
                DurationTEXT: DurationTEXT,
                TreatmentDTEXT: TreatmentDTEXT,
                DataDTEXT: DataDTEXT,
                sourcePage: "extproject",
            });

        } catch (err) {
            console.error("Error fetching skill items:", err);
            res.redirect('/login');
        }
        
    } else {
        res.redirect('/login');
    }
});
app.post('/ExternallyFundedProject', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const Principal = req.body.Principal;
        const CropEXT = req.body.CropEXT;
        const ResearchEXT = req.body.ResearchEXT;
        const ObjectivesEXT = req.body.ObjectivesEXT;
        const executionEXT = req.body.executionEXT;
        const DurationEXT = req.body.DurationEXT;
        const TreatmentEXT = req.body.TreatmentEXT;
        const TreatmentDetailsEXT = req.body.TreatmentDetailsEXT;
        const TreatmentDetailsEXT0 = req.body.TreatmentDetailsEXT0;
        const R1EXT = req.body.R1EXT;
        const R2EXT = req.body.R2EXT;
        const R3EXT = req.body.R3EXT;
        const R11EXT = req.body.R11EXT;
        const R12EXT = req.body.R12EXT;
        const R13EXT = req.body.R13EXT;
        const R14EXT = req.body.R14EXT;
        const R15EXT = req.body.R15EXT;
        const R21EXT = req.body.R21EXT;
        const R22EXT = req.body.R22EXT;
        const R23EXT = req.body.R23EXT;
        const R24EXT = req.body.R24EXT;
        const R25EXT = req.body.R25EXT;
        const R31EXT = req.body.R31EXT;
        const R32EXT = req.body.R32EXT;
        const R33EXT = req.body.R33EXT;
        const R34EXT = req.body.R34EXT;
        const R35EXT = req.body.R35EXT;
        const ExecutionTEXT = req.body.ExecutionTEXT;
        const DurationTEXT = req.body.DurationTEXT;
        const TreatmentDTEXT = req.body.TreatmentDTEXT;
        const DataDTEXT = req.body.DataDTEXT;
        try {
            let DataDTNEWEXT = DataDTEXT; // Initialize a variable to store the modified string
            if (DataDTEXT) {
              DataDTNEWEXT = DataDTEXT.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            let formattedTreatmentDetailsEXT = TreatmentDetailsEXT; // Initialize a variable to store the modified string
            if (TreatmentDetailsEXT) {
                formattedTreatmentDetailsEXT = TreatmentDetailsEXT.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            await logindata.updateMany(
                { username: req.user.username },
                {
                    $set: {
                        Principal: Principal, 
                        CropEXT: CropEXT, 
                        ResearchEXT: ResearchEXT, 
                        ObjectivesEXT: ObjectivesEXT, 
                        executionEXT: executionEXT, 
                        DurationEXT: DurationEXT, 
                        TreatmentEXT: TreatmentEXT,
                    },
                    $push: {
                        TreatmentDetailsEXT: formattedTreatmentDetailsEXT,
                        TreatmentDetailsEXT0:TreatmentDetailsEXT0,
                        R1EXT: R1EXT,
                        R2EXT: R2EXT,
                        R3EXT: R3EXT,
                        R11EXT: R11EXT,
                        R12EXT: R12EXT,
                        R13EXT: R13EXT,
                        R14EXT: R14EXT,
                        R15EXT: R15EXT,
                        R21EXT: R21EXT,
                        R22EXT: R22EXT,
                        R23EXT: R23EXT,
                        R24EXT: R24EXT,
                        R25EXT: R25EXT,
                        R31EXT: R31EXT,
                        R32EXT: R32EXT,
                        R33EXT: R33EXT,
                        R34EXT: R34EXT,
                        R35EXT: R35EXT,
                        ExecutionTEXT: ExecutionTEXT,
                        DurationTEXT: DurationTEXT,
                        TreatmentDTEXT: TreatmentDTEXT,
                        DataDTEXT: DataDTNEWEXT,
                        } 
                        
                    }
                
                );
              res.redirect("/ExternallyFundedProject")
        } catch (error) {
            console.error('Error updating favorite game:', error);
            res.redirect('/ExternallyFundedProject'); // Handle error by redirecting back to profile page
        }
    } else {
        res.redirect('/login');
    }
});

// app.post('/login', (req, res, next) => {
//     const studentExperiment = req.body.StudentExperiment;
//     req.session.studentExperiment = studentExperiment;
//     array = studentExperiment;
//     passport.authenticate('local', {
//         successRedirect: '/redirect',
//         failureRedirect: '/login',
//         failureFlash: true,
//     })(req, res, next); // Call passport.authenticate immediately
// });

app.post('/login', (req, res, next) => {
    const studentExperiment = req.body.StudentExperiment;
    req.session.studentExperiment = studentExperiment;
    array = studentExperiment;

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (!user) {
            return res.redirect('/login'); // Handle incorrect credentials
        }

        if (!user.verified) {
            return res.redirect('/login?error=notverified'); // Redirect to login with an error message
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/redirect');
        });
    })(req, res, next);
});




app.get('/redirect', (req, res) => {
    req.session.studentExperiment = null;
    req.session.array = null;

    if (array === "RCM Project") {
        console.log("Redirecting to RCMProject");
        res.redirect('/RCMProject');
    } else if (array === "Externally Funded Project") {
        console.log("Redirecting to ExternallyFundedProject");
        res.redirect('/ExternallyFundedProject');
    } else {
        console.log("Redirecting to profile");
        res.redirect('/profile'); // Default to profile page
    }
});
app.get('/RCMProject', async (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Faculty = req.user.Faculty;
        const CropRCM = req.user.CropRCM;
        const ResearchRCM = req.user.ResearchRCM;
        const ObjectivesRCM = req.user.ObjectivesRCM;
        const executionRCM = req.user.executionRCM;
        const DurationRCM = req.user.DurationRCM;
        const TreatmentRCM = req.user.TreatmentRCM;
        const TreatmentDetailsRCM = req.user.TreatmentDetailsRCM;
        const R1RCM = req.user.R1RCM;
        const R2RCM = req.user.R2RCM;
        const R3RCM = req.user.R3RCM;
        const TreatmentDetailsRCM0 = req.user.TreatmentDetailsRCM0;
        const R11RCM = req.user.R11RCM;
        const R12RCM = req.user.R12RCM;
        const R13RCM = req.user.R13RCM;
        const R14RCM = req.user.R14RCM;
        const R15RCM = req.user.R15RCM;
        const R21RCM = req.user.R21RCM;
        const R22RCM = req.user.R22RCM;
        const R23RCM = req.user.R23RCM;
        const R24RCM = req.user.R24RCM;
        const R25RCM = req.user.R25RCM;
        const R31RCM = req.user.R31RCM;
        const R32RCM = req.user.R32RCM;
        const R33RCM = req.user.R33RCM;
        const R34RCM = req.user.R34RCM;
        const R35RCM = req.user.R35RCM;
        const ExecutionTRCM = req.user.ExecutionTRCM;
        const DurationTRCM = req.user.DurationTRCM;
        const TreatmentDTRCM = req.user.TreatmentDTRCM;
        const DataDTRCM = req.user.DataDTRCM;
        try {
            res.render("RCMProject.ejs", {
                username: username,
                Faculty: Faculty,
                CropRCM: CropRCM,
                ResearchRCM: ResearchRCM,
                ObjectivesRCM: ObjectivesRCM,
                executionRCM: executionRCM,
                DurationRCM: DurationRCM,
                TreatmentRCM: TreatmentRCM,
                TreatmentDetailsRCM: TreatmentDetailsRCM,
                R1RCM: R1RCM,
                R2RCM: R2RCM,
                R3RCM: R3RCM,
                TreatmentDetailsRCM0:TreatmentDetailsRCM0,
                R11RCM: R11RCM,
                R12RCM: R12RCM,
                R13RCM: R13RCM,
                R14RCM: R14RCM,
                R15RCM: R15RCM,
                R21RCM: R21RCM,
                R22RCM: R22RCM,
                R23RCM: R23RCM,
                R24RCM: R24RCM,
                R25RCM: R25RCM,
                R31RCM: R31RCM,
                R32RCM: R32RCM,
                R33RCM: R33RCM,
                R34RCM: R34RCM,
                R35RCM: R35RCM,
                ExecutionTRCM: ExecutionTRCM,
                DurationTRCM: DurationTRCM,
                TreatmentDTRCM: TreatmentDTRCM,
                DataDTRCM: DataDTRCM,
                sourcePage: "rcmproject",
            });

        } catch (err) {
            console.error("Error fetching skill items:", err);
            res.redirect('/login');
        }
        
    } else {
        res.redirect('/login');
    }
});

app.post('/RCMProject', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const Faculty = req.body.Faculty;
        const CropRCM = req.body.CropRCM;
        const ResearchRCM = req.body.ResearchRCM;
        const ObjectivesRCM = req.body.ObjectivesRCM;
        const executionRCM = req.body.executionRCM;
        const DurationRCM = req.body.DurationRCM;
        const TreatmentRCM = req.body.TreatmentRCM;
        const TreatmentDetailsRCM = req.body.TreatmentDetailsRCM;
        const R1RCM = req.body.R1RCM;
        const R2RCM = req.body.R2RCM;
        const R3RCM = req.body.R3RCM;
        const TreatmentDetailsRCM0 = req.body.TreatmentDetailsRCM0;
        const R11RCM = req.body.R11RCM;
        const R12RCM = req.body.R12RCM;
        const R13RCM = req.body.R13RCM;
        const R14RCM = req.body.R14RCM;
        const R15RCM = req.body.R15RCM;
        const R21RCM = req.body.R21RCM;
        const R22RCM = req.body.R22RCM;
        const R23RCM = req.body.R23RCM;
        const R24RCM = req.body.R24RCM;
        const R25RCM = req.body.R25RCM;
        const R31RCM = req.body.R31RCM;
        const R32RCM = req.body.R32RCM;
        const R33RCM = req.body.R33RCM;
        const R34RCM = req.body.R34RCM;
        const R35RCM = req.body.R35RCM;
        const ExecutionTRCM = req.body.ExecutionTRCM;
        const DurationTRCM = req.body.DurationTRCM;
        const TreatmentDTRCM = req.body.TreatmentDTRCM;
        const DataDTRCM = req.body.DataDTRCM;
        try {
            let DataDTNEWRCM = DataDTRCM; // Initialize a variable to store the modified string
            if (DataDTRCM) {
              DataDTNEWRCM = DataDTRCM.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            let formattedTreatmentDetailsRCM = TreatmentDetailsRCM; // Initialize a variable to store the modified string
            if (TreatmentDetailsRCM) {
                formattedTreatmentDetailsRCM = TreatmentDetailsRCM.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            await logindata.updateMany(
                { username: req.user.username },
                {
                    $set: {
                        Faculty: Faculty, 
                        CropRCM: CropRCM, 
                        ResearchRCM: ResearchRCM, 
                        ObjectivesRCM: ObjectivesRCM, 
                        executionRCM: executionRCM, 
                        DurationRCM: DurationRCM, 
                        TreatmentRCM: TreatmentRCM,
                    },
                    $push: {
                        TreatmentDetailsRCM: formattedTreatmentDetailsRCM,
                        R1RCM: R1RCM,
                        R2RCM: R2RCM,
                        R3RCM: R3RCM,
                        TreatmentDetailsRCM0:TreatmentDetailsRCM0,
                        R11RCM: R11RCM,
                        R12RCM: R12RCM,
                        R13RCM: R13RCM,
                        R14RCM: R14RCM,
                        R15RCM: R15RCM,
                        R21RCM: R21RCM,
                        R22RCM: R22RCM,
                        R23RCM: R23RCM,
                        R24RCM: R24RCM,
                        R25RCM: R25RCM,
                        R31RCM: R31RCM,
                        R32RCM: R32RCM,
                        R33RCM: R33RCM,
                        R34RCM: R34RCM,
                        R35RCM: R35RCM,
                        ExecutionTRCM: ExecutionTRCM,
                        DurationTRCM: DurationTRCM,
                        TreatmentDTRCM: TreatmentDTRCM,
                        DataDTRCM: DataDTNEWRCM,
                        } 
                        
                    }
                
                );
              res.redirect("/RCMProject")
        } catch (error) {
            console.error('Error updating favorite game:', error);
            res.redirect('/RCMProject'); // Handle error by redirecting back to profile page
        }
    } else {
        res.redirect('/login');
    }
});
app.get('/profile', async function (req, res) {
    
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Advisor = req.user.Advisor;
        const Crop = req.user.Crop;
        const Research = req.user.Research;
        const Objectives = req.user.Objectives;
        const SubTitle = req.user.SubTitle;
        const Experiment1Year = req.user.Experiment1Year;
        const Experiment1Duration = req.user.Experiment1Duration;
        const Experiment1Treatment = req.user.Experiment1Treatment;
        const Experiment1Data = req.user.Experiment1Data;
        const Experiment2Year = req.user.Experiment2Year;
        const Experiment2Duration = req.user.Experiment2Duration;
        const Experiment2Treatment = req.user.Experiment2Treatment;
        const Experiment2Data = req.user.Experiment2Data;
        const Experiment3Year = req.user.Experiment3Year;
        const Experiment3Duration = req.user.Experiment3Duration;
        const Experiment3Treatment = req.user.Experiment3Treatment;
        const Experiment3Data = req.user.Experiment3Data;
        const Experiment4Year = req.user.Experiment4Year;
        const Experiment4Duration = req.user.Experiment4Duration;
        const Experiment4Treatment = req.user.Experiment4Treatment;
        const Experiment4Data = req.user.Experiment4Data;
        const Year = req.user.Year;
        const Duration = req.user.Duration;
        const Treatment = req.user.Treatment;
        const TreatmentDetailsP = req.user.TreatmentDetailsP;
        const R11P = req.user.R11P;
        const R12P = req.user.R12P;
        const R13P = req.user.R13P;
        const R14P = req.user.R14P;
        const R15P = req.user.R15P;
        const R21P = req.user.R21P;
        const R22P = req.user.R22P;
        const R23P = req.user.R23P;
        const R24P = req.user.R24P;
        const R25P = req.user.R25P;
        const R31P = req.user.R31P;
        const R32P = req.user.R32P;
        const R33P = req.user.R33P;
        const R34P = req.user.R34P;
        const R35P = req.user.R35P;
        const ExecutionT = req.user.ExecutionT;
        const DurationT = req.user.DurationT;
        const TreatmentDT = req.user.TreatmentDT;
        const DataDT = req.user.DataDT;
        try {
            res.render("profile.ejs", {
                username: username,
                Advisor: Advisor,
                Crop: Crop,
                Research: Research,
                Objectives: Objectives,
                SubTitle: SubTitle,
                Experiment1Year: Experiment1Year,
                Experiment1Duration: Experiment1Duration,
                Experiment1Treatment: Experiment1Treatment,
                Experiment1Data: Experiment1Data,
                Experiment2Year: Experiment2Year,
                Experiment2Duration: Experiment2Duration,
                Experiment2Treatment: Experiment2Treatment,
                Experiment2Data: Experiment2Data,
                Experiment3Year: Experiment3Year,
                Experiment3Duration: Experiment3Duration,
                Experiment3Treatment: Experiment3Treatment,
                Experiment3Data: Experiment3Data,
                Experiment4Year: Experiment4Year,
                Experiment4Duration: Experiment4Duration,
                Experiment4Treatment: Experiment4Treatment,
                Experiment4Data: Experiment4Data,
                Year: Year,
                Duration: Duration,
                Treatment: Treatment,
                TreatmentDetailsP: TreatmentDetailsP,
                R11P: R11P,
                R12P: R12P,
                R13P: R13P,
                R14P: R14P,
                R15P: R15P,
                R21P: R21P,
                R22P: R22P,
                R23P: R23P,
                R24P: R24P,
                R25P: R25P,
                R31P: R31P,
                R32P: R32P,
                R33P: R33P,
                R34P: R34P,
                R35P: R35P,
                ExecutionT: ExecutionT,
                DurationT: DurationT,
                TreatmentDT: TreatmentDT,
                DataDT: DataDT,
                sourcePage: "profile",
            });
        } catch (err) {
            console.error("Error fetching skill items:", err);
            res.redirect('/login');
        }
        
    } else {
        res.redirect('/login');
    }
});





app.post('/profile', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const Advisor = req.body.Advisor; // Get new favorite game from form
        const Crop = req.body.Crop;
        const Research = req.body.Research;
        const Objectives = req.body.Objectives;
        const SubTitle = req.body.SubTitle;
        const Experiment1Year = req.body.Experiment1Year;
        const Experiment1Duration = req.body.Experiment1Duration;
        const Experiment1Treatment = req.body.Experiment1Treatment;
        const Experiment1Data = req.body.Experiment1Data;
        const Experiment2Year = req.body.Experiment2Year;
        const Experiment2Duration = req.body.Experiment2Duration;
        const Experiment2Treatment = req.body.Experiment2Treatment;
        const Experiment2Data = req.body.Experiment2Data;
        const Experiment3Year = req.body.Experiment3Year;
        const Experiment3Duration = req.body.Experiment3Duration;
        const Experiment3Treatment = req.body.Experiment3Treatment;
        const Experiment3Data = req.body.Experiment3Data;
        const Experiment4Year = req.body.Experiment4Year;
        const Experiment4Duration = req.body.Experiment4Duration;
        const Experiment4Treatment = req.body.Experiment4Treatment;
        const Experiment4Data = req.body.Experiment4Data;
        const Year = req.body.Year;
        const Duration = req.body.Duration;
        const Treatment = req.body.Treatment;
        const TreatmentDetailsP = req.body.TreatmentDetailsP;
        const R11P = req.body.R11P;
        const R12P = req.body.R12P;
        const R13P = req.body.R13P;
        const R14P = req.body.R14P;
        const R15P = req.body.R15P;
        const R21P = req.body.R21P;
        const R22P = req.body.R22P;
        const R23P = req.body.R23P;
        const R24P = req.body.R24P;
        const R25P = req.body.R25P;
        const R31P = req.body.R31P;
        const R32P = req.body.R32P;
        const R33P = req.body.R33P;
        const R34P = req.body.R34P;
        const R35P = req.body.R35P;
        const ExecutionT = req.body.ExecutionT;
        const DurationT = req.body.DurationT;
        const TreatmentDT = req.body.TreatmentDT;
        const DataDT = req.body.DataDT;
        try {
            let DataDTNEW = DataDT; // Initialize a variable to store the modified string
            if (DataDT) {
              DataDTNEW = DataDT.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            let formattedTreatmentDetailsP = TreatmentDetailsP; // Initialize a variable to store the modified string
            if (TreatmentDetailsP) {
                formattedTreatmentDetailsP = TreatmentDetailsP.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            await logindata.updateMany(
                { username: req.user.username },
                {
                    $set: {
                        Advisor: Advisor,
                        Crop: Crop,
                        Research: Research,
                        Experiment1Year: Experiment1Year,
                        Experiment1Duration: Experiment1Duration,
                        Experiment1Treatment: Experiment1Treatment,
                        Experiment1Data: Experiment1Data,
                        Experiment2Year: Experiment2Year,
                        Experiment2Duration: Experiment2Duration,
                        Experiment2Treatment: Experiment2Treatment,
                        Experiment2Data: Experiment2Data,
                        Experiment3Year: Experiment3Year,
                        Experiment3Duration: Experiment3Duration,
                        Experiment3Treatment: Experiment3Treatment,
                        Experiment3Data: Experiment3Data,
                        Experiment4Year: Experiment4Year,
                        Experiment4Duration: Experiment4Duration,
                        Experiment4Treatment: Experiment4Treatment,
                        Experiment4Data: Experiment4Data,
                        Year: Year,
                        Duration: Duration,
                        Treatment: Treatment   
                    },
                    $push: {
                        Objectives: Objectives,
                        SubTitle:SubTitle,
                        TreatmentDetailsP: formattedTreatmentDetailsP,
                        R11P: R11P,
                        R12P: R12P,
                        R13P: R13P,
                        R14P: R14P,
                        R15P: R15P,
                        R21P: R21P,
                        R22P: R22P,
                        R23P: R23P,
                        R24P: R24P,
                        R25P: R25P,
                        R31P: R31P,
                        R32P: R32P,
                        R33P: R33P,
                        R34P: R34P,
                        R35P: R35P,
                        ExecutionT: ExecutionT,
                        DurationT: DurationT,
                        TreatmentDT: TreatmentDT,
                        DataDT: DataDTNEW,
                    }
                }
                );
            
              res.redirect("/profile")
        } catch (error) {
            console.error('Error updating favorite game:', error);
            res.redirect('/profile'); // Handle error by redirecting back to profile page
        }
    } else {
        res.redirect('/login');
    }
});

app.post('/delete', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const rowIndexWithPage = req.body.rowIndex; // Get the value of the hidden field

        const [rowIndex, sourcePage] = rowIndexWithPage.split('_');
        const user = req.user;

        try {
            const updatedDataDT = user.DataDT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedExecutionT = user.ExecutionT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedDurationT = user.DurationT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedTreatmentDetailsP = user.TreatmentDetailsP.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR11P = user.R11P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR12P = user.R12P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR13P = user.R13P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR14P = user.R14P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR15P = user.R15P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR21P = user.R21P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR22P = user.R22P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR23P = user.R23P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR24P = user.R24P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR25P = user.R25P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR31P = user.R31P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR32P = user.R32P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR33P = user.R33P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR34P = user.R34P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR35P = user.R35P.filter((_, index) => index !== parseInt(rowIndex));
            const updatedDataDTRCM = user.DataDTRCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedExecutionTRCM = user.ExecutionTRCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedDurationTRCM = user.DurationTRCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedTreatmentDetailsRCM = user.TreatmentDetailsRCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR11RCM = user.R11RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR12RCM = user.R12RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR13RCM = user.R13RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR14RCM = user.R14RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR15RCM = user.R15RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR21RCM = user.R21RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR22RCM = user.R22RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR23RCM = user.R23RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR24RCM = user.R24RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR25RCM = user.R25RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR31RCM = user.R31RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR32RCM = user.R32RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR33RCM = user.R33RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR34RCM = user.R34RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR35RCM = user.R35RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedDataDTEXT = user.DataDTEXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedExecutionTEXT = user.ExecutionTEXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedDurationTEXT = user.DurationTEXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedTreatmentDetailsEXT = user.TreatmentDetailsEXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR11EXT = user.R11EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR12EXT = user.R12EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR13EXT = user.R13EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR14EXT = user.R14EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR15EXT = user.R15EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR21EXT = user.R21EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR22EXT = user.R22EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR23EXT = user.R23EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR24EXT = user.R24EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR25EXT = user.R25EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR31EXT = user.R31EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR32EXT = user.R32EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR33EXT = user.R33EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR34EXT = user.R34EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR35EXT = user.R35EXT.filter((_, index) => index !== parseInt(rowIndex));

            let redirectUrl = "/profile"; // Default to profile page
            if (sourcePage === "rcmproject") {
                redirectUrl = "/RCMProject";
            }
            else if (sourcePage === "extproject") {
                redirectUrl = "/ExternallyFundedProject";
            }


            await logindata.findByIdAndUpdate(
                user._id,
                {
                    DataDT: updatedDataDT,
                    ExecutionT: updatedExecutionT,
                    DurationT: updatedDurationT,
                    TreatmentDetailsP: updatedTreatmentDetailsP,
                    R11P: updatedR11P,
                    R12P: updatedR12P,
                    R13P: updatedR13P,
                    R14P: updatedR14P,
                    R15P: updatedR15P,
                    R21P: updatedR21P,
                    R22P: updatedR22P,
                    R23P: updatedR23P,
                    R24P: updatedR24P,
                    R25P: updatedR25P,
                    R31P: updatedR31P,
                    R32P: updatedR32P,
                    R33P: updatedR33P,
                    R34P: updatedR34P,
                    R35P: updatedR35P,
                    DataDTRCM: updatedDataDTRCM,
                    ExecutionTRCM: updatedExecutionTRCM,
                    DurationTRCM: updatedDurationTRCM,
                    TreatmentDetailsRCM: updatedTreatmentDetailsRCM,
                    R11RCM: updatedR11RCM,
                    R12RCM: updatedR12RCM,
                    R13RCM: updatedR13RCM,
                    R14RCM: updatedR14RCM,
                    R15RCM: updatedR15RCM,
                    R21RCM: updatedR21RCM,
                    R22RCM: updatedR22RCM,
                    R23RCM: updatedR23RCM,
                    R24RCM: updatedR24RCM,
                    R25RCM: updatedR25RCM,
                    R31RCM: updatedR31RCM,
                    R32RCM: updatedR32RCM,
                    R33RCM: updatedR33RCM,
                    R34RCM: updatedR34RCM,
                    R35RCM: updatedR35RCM,
                    DataDTEXT: updatedDataDTEXT,
                    ExecutionTEXT: updatedExecutionTEXT,
                    DurationTEXT: updatedDurationTEXT,
                    TreatmentDetailsEXT: updatedTreatmentDetailsEXT,
                    R11EXT: updatedR11EXT,
                    R12EXT: updatedR12EXT,
                    R13EXT: updatedR13EXT,
                    R14EXT: updatedR14EXT,
                    R15EXT: updatedR15EXT,
                    R21EXT: updatedR21EXT,
                    R22EXT: updatedR22EXT,
                    R23EXT: updatedR23EXT,
                    R24EXT: updatedR24EXT,
                    R25EXT: updatedR25EXT,
                    R31EXT: updatedR31EXT,
                    R32EXT: updatedR32EXT,
                    R33EXT: updatedR33EXT,
                    R34EXT: updatedR34EXT,
                    R35EXT: updatedR35EXT,
                }
            );

            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error deleting row:', error);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});


app.post('/upload', upload.single('file'), async (req, res) => {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username;
        const sourcePage = req.body.sourcePage;
        try {
            // Update the user document to store the file information
            await logindata.findOneAndUpdate(
                { username: username },
                { $set: { uploadedFile: req.file } }
            );

            let redirectUrl = "/profile"; // Default to profile page
            if (sourcePage === "rcmproject") {
                redirectUrl = "/RCMProject";
            }
            else if (sourcePage === "extproject") {
                redirectUrl = "/ExternallyFundedProject";
            }
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
            res.redirect('/ExternallyFundedProject'); // Handle error by redirecting back to the form
        }
    } else {
        res.redirect('/login');
    }
});





app.get('/adminVerify', async (req, res) => {
        try {
            const unverifiedUsers = await logindata.find({ verified: false });
            res.render('adminVerify.ejs', { unverifiedUsers });
        } catch (error) {
            console.error('Error fetching unverified users:', error);
            res.redirect('/profile'); // Redirect to a suitable page
        }
    
});


app.post('/adminVerify/accept', async (req, res) => {
        const userId = req.body.userId;
        try {
            await logindata.findByIdAndUpdate(userId, { verified: true });
            res.redirect('/adminVerify');
        } catch (error) {
            console.error('Error accepting user:', error);
            res.redirect('/adminVerify');
        }
});

app.post('/adminVerify/decline', async (req, res) => {
        const userId = req.body.userId;
        try {
            await logindata.findByIdAndDelete(userId);
            res.redirect('/adminVerify');
        } catch (error) {
            console.error('Error declining user:', error);
            res.redirect('/adminVerify');
        }
});





app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



    app.listen(3000);