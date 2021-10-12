const mongoose = require("mongoose");
const logger = require("../logger.js");
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@cluster0.adqq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => logger.info("DB connected"))
  .catch((err) => logger.error("DB connection error \n" + err));

const studentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  Birthdate: String,
  position: String, //job role
  abilities: [String],
  languages: [String],
  wayOfWork: [String],
  experienceLevel: String,
  ExtraAbilities: [String],
  picture: String,
  description: String,
  country: String,
  password: String,
  email: { type: String, unique: true },
  phone: { type: String, lowercase: true, trim: true },
  gender: { type: String, lowercase: true, trim: true },
  location: { type: String, lowercase: true, trim: true },
  education: [
    {
      description: { type: String, lowercase: true, trim: true },
      timeLapse: { type: String, lowercase: true, trim: true },
    },
  ],
  experience: [
    {
      description: { type: String, lowercase: true, trim: true },
      timeLapse: { type: String, lowercase: true, trim: true },
    },
  ],
  proyect: [
    {
      title: { type: String, lowercase: true, trim: true },
      description: { type: String, lowercase: true, trim: true },
      link: { type: String, trim: true },
      image: { type: String, trim: true },
    },
  ],
  isAvailable: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  review: [
    {
      _id: String,
      description: String,
      name: String,
      surname: String,
      picture: String,
    },
  ],
  favorites: [{ offer: { type: String }, offerID: { type: String } }],
  googleId: { type: String, default: "0" },
});

const henrySchema = new mongoose.Schema({
  name: String,
  surname: String,
  picture: String,
  description: String, //para que describa quien es en henry o que hace, si es TL o Toni
});

const companySchema = new mongoose.Schema({
  name: String,
  linkPage: String,
  picture: String,
  description: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [
    {
      postulant: { type: String },
      postulantID: { type: String },
      offer: { type: String },
      offerID: { type: String },
    },
  ],
  googleId: { type: String, default: "0" },
});

const jobOfferSchema = new mongoose.Schema({
  companyId: String,
  title: String,
  company: String,
  date: String,
  postulants: [String],
  description: String,
  experienceLevel: String,
  wayOfWork: [String],
  languages: [String],
  jobType: String,
  requirements: [String],
  position: String,
  location: String,
  email: String,
});

const review = new mongoose.Schema({
  autor: String,
  description: String,
});

const news = new mongoose.Schema({
  description: String,
});

const Student = mongoose.model("Student", studentSchema);
const Henry = mongoose.model("Henry", henrySchema);
const Company = mongoose.model("Company", companySchema);
const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
const Review = mongoose.model("Review", review);
const News = mongoose.model("News", news);

module.exports = {
  Student,
  Henry,
  Company,
  JobOffer,
  Review,
  News,
};
