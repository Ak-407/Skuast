if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const { initializePassport } = require('./passport-config');
const rateLimit = require('express-rate-limit');
const XLSX = require('xlsx');


const flash = require('express-flash');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const { post } = require('jquery');
const uploadsDir = path.join(__dirname, 'uploads');

const loginLimiter = rateLimit({
    windowMs: 1599 * 60 * 1000, // 15 minutes
    max: 388, // Limit each IP to 3 login attempts per windowMs
    message: 'Too many login attempts from this IP, please try again later.'
});

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
);

app.use(passport.initialize());
app.use(passport.session());

// Apply rate-limiting middleware to your login route(s)
app.use('/login', loginLimiter);


mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb+srv://jsamaan:amaan123@cluster0.vz55wc0.mongodb.net/jsamaan?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);




const BlockSchema = new mongoose.Schema({
    extend: String,
    R1: [String],
    R2: [String],
    R3: [String]
});
const BlockSchemaRCM = new mongoose.Schema({
    extendRCM: String,
    R1RCM: [String],
    R2RCM: [String],
    R3RCM: [String]
});
const BlockSchemaEXT = new mongoose.Schema({
    extendEXT: String,
    R1EXT: [String],
    R2EXT: [String],
    R3EXT: [String]
});





const LoginData = mongoose.Schema({
    username: String,
    password: String,verified: {
        type: Boolean,
        default: false,
    },
    Advisor: [String],
    blocks: [[BlockSchema]],
    blocksRCM: [[BlockSchemaRCM]],
    blocksEXT: [[BlockSchemaEXT]],
    allData:[String],
    Crop: [String],
    Research: [String],
    Objectives:[String],
    TDARR:[String],
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
    TC: [String],
    TCRCM: [String],
    TCEXT: [String],
    Faculty:[String],
    CropRCM:[String],
    ResearchRCM:[String],
    ObjectivesRCM:[String],
    executionRCM:[String],
    DurationRCM:[String],
    TreatmentRCM:[String],
    TreatmentDetailsRCM: [String],
    Principal:[String],
    CropEXT:[String],
    ResearchEXT:[String],
    ObjectivesEXT:[String],
    executionEXT:[String],
    DurationEXT:[String],
    TreatmentEXT:[String],
    TreatmentDetailsPEXT:[String],
    TreatmentDetailsPEXT0:[String],
    TreatmentDetailsRCM0:[String],
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
        const TCEXT = req.user.TCEXT;

        const blocksEXT = req.user.blocksEXT;
        console.log(blocksEXT);
    
        

       

          

         
          


        







        const allDataEXT = await logindata.find();
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Principal = req.user.Principal;
        const CropEXT = req.user.CropEXT;
        const ResearchEXT = req.user.ResearchEXT;
        const ObjectivesEXT = req.user.ObjectivesEXT;
        const executionEXT = req.user.executionEXT;
        const DurationEXT = req.user.DurationEXT;
        const TreatmentEXT = req.user.TreatmentEXT;
        const TreatmentDetailsPEXT = req.user.TreatmentDetailsPEXT;
        const TreatmentDetailsPEXT0 = req.user.TreatmentDetailsPEXT0;
        const ExecutionTEXT = req.user.ExecutionTEXT;
        const DurationTEXT = req.user.DurationTEXT;
        const TreatmentDTEXT = req.user.TreatmentDTEXT;
        const DataDTEXT = req.user.DataDTEXT;
        try {
            res.render("ExternallyFundedProject.ejs", {
                blocksEXT:blocksEXT,
                TCEXT:TCEXT,
                dataEXT: allDataEXT,
                username: username,
                Principal: Principal,
                CropEXT: CropEXT,
                ResearchEXT: ResearchEXT,
                ObjectivesEXT: ObjectivesEXT,
                executionEXT: executionEXT,
                DurationEXT: DurationEXT,
                TreatmentEXT: TreatmentEXT,
                TreatmentDetailsPEXT: TreatmentDetailsPEXT,
                TreatmentDetailsPEXT0:TreatmentDetailsPEXT0,
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
        const blocksEXT = [];
        const TCEXT = req.body.TCEXT;
        const Principal = req.body.Principal;
        const CropEXT = req.body.CropEXT;
        const ResearchEXT = req.body.ResearchEXT;
        const ObjectivesEXT = req.body.ObjectivesEXT;
        const executionEXT = req.body.executionEXT;
        const DurationEXT = req.body.DurationEXT;
        const TreatmentEXT = req.body.TreatmentEXT;
        const TreatmentDetailsPEXT = req.body.TreatmentDetailsPEXT;
        const TreatmentDetailsPEXT0 = req.body.TreatmentDetailsPEXT0;
        const ExecutionTEXT = req.body.ExecutionTEXT;
        const DurationTEXT = req.body.DurationTEXT;
        const TreatmentDTEXT = req.body.TreatmentDTEXT;
        const DataDTEXT = req.body.DataDTEXT;
        try {
            let DataDTNEWEXT = DataDTEXT; // Initialize a variable to store the modified string
            if (DataDTEXT) {
              DataDTNEWEXT = DataDTEXT.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
            }
            let formattedTreatmentDetailsPEXT = TreatmentDetailsPEXT; // Initialize a variable to store the modified string
            if (TreatmentDetailsPEXT) {
                formattedTreatmentDetailsPEXT = TreatmentDetailsPEXT.replace(/\n/g, '<br>'); // Replace line breaks if DataDT is defined
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
                        TreatmentDetailsPEXT: formattedTreatmentDetailsPEXT,
                        TreatmentDetailsPEXT0:TreatmentDetailsPEXT0,
                        ExecutionTEXT: ExecutionTEXT,
                        DurationTEXT: DurationTEXT,
                        TCEXT:TCEXT,
                        TreatmentDTEXT: TreatmentDTEXT,
                        DataDTEXT: DataDTNEWEXT,
                        } 
                        
                    }
                
                );
                for (let i = 0; i < req.body.extendEXT.length; i++) {
                    const blockEXT = {
                        extendEXT: req.body.extendEXT[i],
                    R1EXT: req.body.R1EXT[i],
                    R2EXT: req.body.R2EXT[i],
                    R3EXT: req.body.R3EXT[i]
                    };
                    console.log(blockEXT);
                    blocksEXT.push(blockEXT); // Push the block into the blocks array
                }
                await logindata.updateMany(
                    { username: req.user.username },
                    { $push: { blocksEXT:  blocksEXT  } } // Push the blocks array wrapped with [ and ] using $each
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

// app.post('/login', (req, res, next) => {
//     const studentExperiment = req.body.StudentExperiment;
//     req.session.studentExperiment = studentExperiment;
//     array = studentExperiment;

//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             console.error(err);
//             return next(err);
//         }

//         if (!user) {
//             return res.redirect('/login'); // Handle incorrect credentials
//         }

//         if (!user.verified) {
//             return res.redirect('/login?error=notverified'); // Redirect to login with an error message
//         }

//         req.logIn(user, (err) => {
//             if (err) {
//                 console.error(err);
//                 return next(err);
//             }
//             return res.redirect('/redirect');
//         });
//     })(req, res, next);
// });


app.post('/login', loginLimiter, (req, res, next) => {
    const studentExperiment = req.body.StudentExperiment;
    req.session.studentExperiment = studentExperiment;
    array = studentExperiment;

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info && info.message === 'Too many login attempts, please try again later.') {
            // Redirect without exposing rate-limiting message
            return res.status(429).redirect('/login?error=ratelimit');
        }

        if (!user) {
            return res.redirect('/login?error=incorrect'); // Handle incorrect credentials
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
        res.redirect('/profile'); // Default to profile pages
    }
});
app.get('/RCMProject', async (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated() && req.user && req.user.username) {
        const TCRCM = req.user.TCRCM;

        const blocksRCM = req.user.blocksRCM;
        console.log(blocksRCM);
    
        

       

          

         
          


        







        const allDataRCM = await logindata.find();
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Faculty = req.user.Faculty;
        const CropRCM = req.user.CropRCM;
        const ResearchRCM = req.user.ResearchRCM;
        const ObjectivesRCM = req.user.ObjectivesRCM;
        const executionRCM = req.user.executionRCM;
        const DurationRCM = req.user.DurationRCM;
        const TreatmentRCM = req.user.TreatmentRCM;
        const TreatmentDetailsRCM = req.user.TreatmentDetailsRCM;
        const TreatmentDetailsRCM0 = req.user.TreatmentDetailsRCM0;
        const ExecutionTRCM = req.user.ExecutionTRCM;
        const DurationTRCM = req.user.DurationTRCM;
        const TreatmentDTRCM = req.user.TreatmentDTRCM;
        const DataDTRCM = req.user.DataDTRCM;
        try {
            res.render("RCMProject.ejs", {
                blocksRCM:blocksRCM,
                TCRCM:TCRCM,
                dataRCM: allDataRCM,
                username: username,
                Faculty: Faculty,
                CropRCM: CropRCM,
                ResearchRCM: ResearchRCM,
                ObjectivesRCM: ObjectivesRCM,
                executionRCM: executionRCM,
                DurationRCM: DurationRCM,
                TreatmentRCM: TreatmentRCM,
                TreatmentDetailsRCM: TreatmentDetailsRCM,
                TreatmentDetailsRCM0:TreatmentDetailsRCM0,
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
       
        const blocksRCM = [];
        const TCRCM = req.body.TCRCM;
    
        

       

          

         
          



        const Faculty = req.body.Faculty;
        const CropRCM = req.body.CropRCM;
        const ResearchRCM = req.body.ResearchRCM;
        const ObjectivesRCM = req.body.ObjectivesRCM;
        const executionRCM = req.body.executionRCM;
        const DurationRCM = req.body.DurationRCM;
        const TreatmentRCM = req.body.TreatmentRCM;
        const TreatmentDetailsRCM = req.body.TreatmentDetailsRCM;
        const TreatmentDetailsRCM0 = req.body.TreatmentDetailsRCM0;
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
                        TreatmentDetailsRCM0:TreatmentDetailsRCM0,
                        ExecutionTRCM: ExecutionTRCM,
                        DurationTRCM: DurationTRCM,
                        TCRCM:TCRCM,
                        TreatmentDTRCM: TreatmentDTRCM,
                        DataDTRCM: DataDTNEWRCM,
                        } 
                        
                    }
                
                );
                for (let i = 0; i < req.body.extendRCM.length; i++) {
                    const blockRCM = {
                        extendRCM: req.body.extendRCM[i],
                    R1RCM: req.body.R1RCM[i],
                    R2RCM: req.body.R2RCM[i],
                    R3RCM: req.body.R3RCM[i]
                    };
                    console.log(blockRCM);
                    blocksRCM.push(blockRCM); // Push the block into the blocks array
                }
                await logindata.updateMany(
                    { username: req.user.username },
                    { $push: { blocksRCM:  blocksRCM  } } // Push the blocks array wrapped with [ and ] using $each
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


    

const xlsx = require('xlsx');


app.get('/export-data', async (req, res) => {
    if (req.isAuthenticated() && req.user && req.user.username) {
        try {
            // Retrieve data associated with the logged-in user
            const username = req.user.username;
            const userData = await logindata.findOne({ username });

            if (!userData) {
                // If no data found for the logged-in user, return an error
                return res.status(404).send('Data not found for the logged-in user');
            }

            // Convert data to an array of objects
            const dataArray = [{
                    username: userData.username,
                    password: userData.password,
                    Advisor: userData.Advisor.join(', '), // Convert array to string
                    Crop: userData.Crop.join(', '), // Convert array to string
                    Research: userData.Research.join(', '), // Convert array to string
                    Objectives: userData.Objectives.join(', '), // Convert array to string
                    blocks: userData.blocks.map(block => block.join(', ')).join('; '),
                    blocksRCM: userData.blocksRCM.join(', '),
                    blocksEXT: userData.blocksEXT.join(', '),
                    allData: userData.allData.join(', '),
                    Crop: userData.Crop.join(', '),
                    Research: userData.Research.join(', '),
                    Objectives: userData.Objectives.join(', '),
                    TDARR: userData.TDARR.join(', '),
                    Experiment1Year: userData.Experiment1Year.join(', '),
                    Experiment1Duration: userData.Experiment1Duration.join(', '),
                    Experiment1Treatment: userData.Experiment1Treatment.join(', '),
                    Experiment1Data: userData.Experiment1Data.join(', '),
                    Experiment2Year: userData.Experiment2Year.join(', '),
                    Experiment2Duration: userData.Experiment2Duration.join(', '),
                    Experiment2Treatment: userData.Experiment2Treatment.join(', '),
                    Experiment2Data: userData.Experiment2Data.join(', '),
                    Experiment3Year: userData.Experiment3Year.join(', '),
                    Experiment3Duration: userData.Experiment3Duration.join(', '),
                    Experiment3Treatment: userData.Experiment3Treatment.join(', '),
                    Experiment3Data: userData.Experiment3Data.join(', '),
                    Experiment4Year: userData.Experiment4Year.join(', '),
                    Experiment4Duration: userData.Experiment4Duration.join(', '),
                    Experiment4Treatment: userData.Experiment4Treatment.join(', '),
                    Experiment4Data: userData.Experiment4Data.join(', '),
                    Year: userData.Year.join(', '),
                    Duration: userData.Duration.join(', '),
                    Treatment: userData.Treatment.join(', '),
                    TreatmentDetailsP: userData.TreatmentDetailsP.join(', '),
                    TC: userData.TC.join(', '),
                    TCRCM: userData.TCRCM.join(', '),
                    TCEXT: userData.TCEXT.join(', '),
                    Faculty: userData.Faculty.join(', '),
                    CropRCM: userData.CropRCM.join(', '),
                    ResearchRCM: userData.ResearchRCM.join(', '),
                    ObjectivesRCM: userData.ObjectivesRCM.join(', '),
                    executionRCM: userData.executionRCM.join(', '),
                    DurationRCM: userData.DurationRCM.join(', '),
                    TreatmentRCM: userData.TreatmentRCM.join(', '),
                    TreatmentDetailsRCM: userData.TreatmentDetailsRCM.join(', '),
                    Principal: userData.Principal.join(', '),
                    CropEXT: userData.CropEXT.join(', '),
                    ResearchEXT: userData.ResearchEXT.join(', '),
                    ObjectivesEXT: userData.ObjectivesEXT.join(', '),
                    executionEXT: userData.executionEXT.join(', '),
                    DurationEXT: userData.DurationEXT.join(', '),
                    TreatmentEXT: userData.TreatmentEXT.join(', '),
                    TreatmentDetailsPEXT: userData.TreatmentDetailsPEXT.join(', '),
                    TreatmentDetailsPEXT0: userData.TreatmentDetailsPEXT0.join(', '),
                    TreatmentDetailsRCM0: userData.TreatmentDetailsRCM0.join(', '),
                    ExecutionT: userData.ExecutionT.join(', '),
                    DurationT: userData.DurationT.join(', '),
                    TreatmentDT: userData.TreatmentDT.join(', '),
                    DataDT: userData.DataDT.join(', '),
                    ExecutionTEXT: userData.ExecutionTEXT.join(', '),
                    DurationTEXT: userData.DurationTEXT.join(', '),
                    TreatmentDTEXT: userData.TreatmentDTEXT.join(', '),
                    DataDTEXT: userData.DataDTEXT.join(', '),
                    ExecutionTRCM: userData.ExecutionTRCM.join(', '),
                    DurationTRCM: userData.DurationTRCM.join(', '),
                    TreatmentDTRCM: userData.TreatmentDTRCM.join(', '),
                    DataDTRCM: userData.DataDTRCM.join(', '),
            }];

            // Create a new workbook
            const wb = xlsx.utils.book_new();

            // Convert the data array to a worksheet
            const ws = xlsx.utils.json_to_sheet(dataArray);

            // Add the worksheet to the workbook
            xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Write the workbook to a buffer
            const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

            // Set response headers for Excel file download
            res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the buffer as the response
            res.send(buffer);
        } catch (error) {
            console.error('Error exporting data to Excel:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect('/login');
    }
});




app.get('/export-data-all', async (req, res) => {
    if (req.isAuthenticated() && req.user && req.user.username) {
        try {
            const data = await logindata.find();

            // Convert data to an array of objects
            const dataArray = data.map(doc => {
                return {
                    username: doc.username,
                    password: doc.password,
                    Advisor: doc.Advisor.join(', '), // Convert array to string
                    Crop: doc.Crop.join(', '), // Convert array to string
                    Research: doc.Research.join(', '), // Convert array to string
                    Objectives: doc.Objectives.join(', '), // Convert array to string
                    blocks: doc.blocks.map(block => block.join(', ')).join('; '),
                    blocksRCM: doc.blocksRCM.join(', '),
                    blocksEXT: doc.blocksEXT.join(', '),
                    allData: doc.allData.join(', '),
                    Crop: doc.Crop.join(', '),
                    Research: doc.Research.join(', '),
                    Objectives: doc.Objectives.join(', '),
                    TDARR: doc.TDARR.join(', '),
                    Experiment1Year: doc.Experiment1Year.join(', '),
                    Experiment1Duration: doc.Experiment1Duration.join(', '),
                    Experiment1Treatment: doc.Experiment1Treatment.join(', '),
                    Experiment1Data: doc.Experiment1Data.join(', '),
                    Experiment2Year: doc.Experiment2Year.join(', '),
                    Experiment2Duration: doc.Experiment2Duration.join(', '),
                    Experiment2Treatment: doc.Experiment2Treatment.join(', '),
                    Experiment2Data: doc.Experiment2Data.join(', '),
                    Experiment3Year: doc.Experiment3Year.join(', '),
                    Experiment3Duration: doc.Experiment3Duration.join(', '),
                    Experiment3Treatment: doc.Experiment3Treatment.join(', '),
                    Experiment3Data: doc.Experiment3Data.join(', '),
                    Experiment4Year: doc.Experiment4Year.join(', '),
                    Experiment4Duration: doc.Experiment4Duration.join(', '),
                    Experiment4Treatment: doc.Experiment4Treatment.join(', '),
                    Experiment4Data: doc.Experiment4Data.join(', '),
                    Year: doc.Year.join(', '),
                    Duration: doc.Duration.join(', '),
                    Treatment: doc.Treatment.join(', '),
                    TreatmentDetailsP: doc.TreatmentDetailsP.join(', '),
                    TC: doc.TC.join(', '),
                    TCRCM: doc.TCRCM.join(', '),
                    TCEXT: doc.TCEXT.join(', '),
                    Faculty: doc.Faculty.join(', '),
                    CropRCM: doc.CropRCM.join(', '),
                    ResearchRCM: doc.ResearchRCM.join(', '),
                    ObjectivesRCM: doc.ObjectivesRCM.join(', '),
                    executionRCM: doc.executionRCM.join(', '),
                    DurationRCM: doc.DurationRCM.join(', '),
                    TreatmentRCM: doc.TreatmentRCM.join(', '),
                    TreatmentDetailsRCM: doc.TreatmentDetailsRCM.join(', '),
                    Principal: doc.Principal.join(', '),
                    CropEXT: doc.CropEXT.join(', '),
                    ResearchEXT: doc.ResearchEXT.join(', '),
                    ObjectivesEXT: doc.ObjectivesEXT.join(', '),
                    executionEXT: doc.executionEXT.join(', '),
                    DurationEXT: doc.DurationEXT.join(', '),
                    TreatmentEXT: doc.TreatmentEXT.join(', '),
                    TreatmentDetailsPEXT: doc.TreatmentDetailsPEXT.join(', '),
                    TreatmentDetailsPEXT0: doc.TreatmentDetailsPEXT0.join(', '),
                    TreatmentDetailsRCM0: doc.TreatmentDetailsRCM0.join(', '),
                    ExecutionT: doc.ExecutionT.join(', '),
                    DurationT: doc.DurationT.join(', '),
                    TreatmentDT: doc.TreatmentDT.join(', '),
                    DataDT: doc.DataDT.join(', '),
                    ExecutionTEXT: doc.ExecutionTEXT.join(', '),
                    DurationTEXT: doc.DurationTEXT.join(', '),
                    TreatmentDTEXT: doc.TreatmentDTEXT.join(', '),
                    DataDTEXT: doc.DataDTEXT.join(', '),
                    ExecutionTRCM: doc.ExecutionTRCM.join(', '),
                    DurationTRCM: doc.DurationTRCM.join(', '),
                    TreatmentDTRCM: doc.TreatmentDTRCM.join(', '),
                    DataDTRCM: doc.DataDTRCM.join(', '),
                };
            });

            // Create a new workbook
            const wb = xlsx.utils.book_new();

            // Convert the data array to a worksheet
            const ws = xlsx.utils.json_to_sheet(dataArray);

            // Add the worksheet to the workbook
            xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Write the workbook to a buffer
            const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

            // Set response headers for Excel file download
            res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the buffer as the response
            res.send(buffer);
        } catch (error) {
            console.error('Error exporting data to Excel:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect('/login');
    }
});




app.get('/profile', async function (req, res) {
    
    if (req.isAuthenticated() && req.user && req.user.username) {
       
        const TC = req.user.TC;

        const blocks = req.user.blocks;
        console.log(blocks);
        const allData = await logindata.find();
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Advisor = req.user.Advisor;
        const Crop = req.user.Crop;
        const Research = req.user.Research;
        const Objectives = req.user.Objectives;
        const TDARR = req.user.TDARR;
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
        const ExecutionT = req.user.ExecutionT;
        const DurationT = req.user.DurationT;
        const TreatmentDT = req.user.TreatmentDT;
        const DataDT = req.user.DataDT;
        try {
            res.render("profile.ejs", {
                blocks:blocks,
                TC:TC,
                data: allData,
                username: username,
                Advisor: Advisor,
                Crop: Crop,
                Research: Research,
                Objectives: Objectives,
                TDARR: TDARR,
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
                ExecutionT: ExecutionT,
                DurationT: DurationT,
                TreatmentDT: TreatmentDT,
                DataDT: DataDT,
                sourcePage: "profile",
                exportUrl: '/export-data'
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

        const blocks = [];
        const TC = req.body.TC;
        
        const Advisor = req.body.Advisor;
        const Crop = req.body.Crop;
        const Research = req.body.Research;
        const Objectives = req.body.Objectives;
        const TDARR = req.body.TDARR;
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
                        TDARR: TDARR,
                        SubTitle:SubTitle,
                        TreatmentDetailsP: formattedTreatmentDetailsP,
                        TC:TC,
                        ExecutionT: ExecutionT,
                        DurationT: DurationT,
                        TreatmentDT: TreatmentDT,
                        DataDT: DataDTNEW,
        }
            });
            for (let i = 0; i < req.body.extend.length; i++) {
                const block = {
                    extend: req.body.extend[i],
                R1: req.body.R1[i],
                R2: req.body.R2[i],
                R3: req.body.R3[i]
                };
                console.log(block);
                blocks.push(block); // Push the block into the blocks array
            }
            await logindata.updateMany(
                { username: req.user.username },
                { $push: { blocks:  blocks  } } // Push the blocks array wrapped with [ and ] using $each
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









function filterAndUpdateProperty(user, propertyName, rowIndex) {
    if (user && Array.isArray(user[propertyName])) {
        const updatedProperty = user[propertyName].filter((_, index) => index !== parseInt(rowIndex));
        return updatedProperty;
    } else {
        console.error(`Invalid property: ${propertyName}`);
        return [];
    }
}




















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