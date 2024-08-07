
const express = require("express") ; 
const mongoose = require("mongoose") ; 
const homePath = require("./routes/homeSection");
const dotenv = require("dotenv") ;
const partnerPath = require('./routes/partnersSection');
const aboutPath = require('./routes/AboutSection');
const servicePAth = require('./routes/serviceSection');
const ServicePart  = require('./routes/servicePart');
const authPath =  require('./routes/auth') ; 
const userPath = require('./routes/users');
const resetPasswordPath = require('./routes/ResetPassword');
const workPath = require('./routes/WorkSection') ;
const projectPath = require('./routes/ProjectSection') ;
const TestimonialPath = require('./routes/testimonials');
const MessagePath = require('./routes/message');
const path = require('path'); 
const cors = require('cors');

dotenv.config() ;

const app = express();
app.use(cors());
const port = process.env.port || 3000; 
app.use(express.json()) ;
app.listen(port , ()=>console.log(`server is running on port ${port}`)) ;

mongoose 
.connect(process.env.MONGO_URI) 
.then(() => console.log("DB connected")) 
.catch((console.error("failed to MongoDB"))) ;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use ("/home" ,homePath) ; 
app.use("/partners" , partnerPath) ; 
app.use("/about" ,aboutPath ) ; 
app.use("/services" , servicePAth) ; 
app.use("/serviceSection" , ServicePart) ; 
app.use('/auth' , authPath);
app.use('/user' , userPath) ; 
app.use("/resetPassword",resetPasswordPath);
app.use("/work",workPath); 
app.use("/projectSection",projectPath);
app.use("/Testimonials",TestimonialPath);
app.use("/Messages",MessagePath);