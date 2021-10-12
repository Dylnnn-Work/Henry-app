const { Student, Company, JobOffer, News, Review } = require("./models");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const logger = require("../logger.js");
require("dotenv").config();
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

const resolvers = {
  Query: {
    alumnos: async (parent, { limit, offset, where, order }, context, info) => {
      try {
        await logger.info("query alumnos");
        const query = Student.find(where);
        if (offset) {
          query.skip(offset);
        }
        if (limit) {
          query.limit(limit);
        }
        if (order) {
          query.sort(order);
        }
        return await query.exec();
      } catch (error) {
        logger.error(error);
      }
    },

    busquedaAlumnos: async (parent, args, context, info) => {
      await logger.info("query busquedaAlumnos find by arguments");
      const { search = null } = args;
      let searchQuery = {};
      if (search) {
        searchQuery = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { surname: { $regex: search, $options: "i" } },
            { abilities: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
          ],
        };
      }
      const alumnos = await Student.find(searchQuery);
      return await alumnos;
    },

    alumno: async (parent, args, context, info) => {
      await logger.info("query alumno find by id");
      return await Student.findById(args._id);
    },
    alumnoPorMail: async (parent, args, context, info) => {
      await logger.info("query alumno find by email");
      return await Student.findOne(args);
    },
    empresaPorMail: async (parent, args, context, info) => {
      await logger.info("query alumno find by email");
      return await Company.findOne(args);
    },
    empresa: async (parent, args, context, info) => {
      await logger.info("empresa alumno find by id");
      return await Company.findById(args._id);
    },
    empresas: async () => {
      await logger.info("query empresas find all");
      return await Company.find({});
    },
    ofertas: async () => {
      await logger.info("query ofertas find all");
      return await JobOffer.find({});
    },
    ofertasbycompany: async (parent, args, context, info) => {
      await logger.info("query ofertas find by company");
      const { company = null } = args;
      let searchQuery = {};
      if (company) {
        searchQuery = {
          $or: [
            { email: { $regex: company, $options: "i" } },
            { title: { $regex: company, $options: "i" } },
            { description: { $regex: company, $options: "i" } },
            { company: { $regex: company, $options: "i" } },
            { requirements: { $regex: company, $options: "i" } },
          ],
        };
      }
      const Ofertas = await JobOffer.find(searchQuery);
      return await Ofertas;
    },
    ofertasByCompanyId: async (parent, args, context, info) => {
      try {
        const ofertasByCompany = await JobOffer.find({})
          .where("companyId")
          .equals(args._id);
        return ofertasByCompany;
      } catch (err) {
        logger.error(err);
      }
    },
    oferta: async (parent, args, context, info) => {
      return await JobOffer.findById(args._id);
    },
    busqueda: async (parent, args, context, info) => {
      return await Student.find().all("name", [args.name]);
    },
    news: async (parent, args, context, info) => {
      return await News.find();
    },
    review: async (parent, args, context, info) => {
      return await Review.find();
    },
    alumnoLogueado: async (_, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, process.env.SECRET_KEY);
      return await Student.findById(user._id);
    },
    empresaLogueada: async (_, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, process.env.SECRET_KEY);
      return await Company.findById(user._id);
    },
    verificarLogueo: async (parent, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, process.env.SECRET_KEY);
      const role = user.role;
      return await role;
    },

    reviewsPorAlumno: async (parent, args, context, info) => {
      const student = await Student.findById(args._id);
      //  Student.findById(student.review.autorId);
      const { review } = student;
      return review;
    },

    studentsByCountry: async () => {
      try {
        console.log("studentsByCountry");
        const agrupacion = await Student.aggregate([
          {
            $group: {
              _id: { $toLower: "$country" },
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              counts: {
                $push: { k: "$_id", v: "$count" },
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: { $arrayToObject: "$counts" },
            },
          },
        ]);
        console.log(agrupacion);
        return agrupacion;
      } catch (error) {
        logger.error(error);
      }
    },
    numberOfStudents: async () => {
      try {
        return await Student.aggregate([
          {
            $group: {
              _id: "name",
              total: { $sum: 1 },
            },
          },
        ]);
      } catch (error) {
        logger.error(error);
      }
    },
    numberOfCompanies: async () => {
      try {
        return await Company.aggregate([
          {
            $group: {
              _id: "name",
              total: { $sum: 1 },
            },
          },
        ]);
      } catch (error) {
        logger.error(error);
      }
    },
  },
  Mutation: {
    agregarAlumno: async (
      parent,
      { name, surname, email, password, googleId, picture, linkPage }
    ) => {
      try {
        pass = await CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_ENCRYPT
        ).toString();
        const user = await Student.create({
          name,
          surname,
          email,
          password: pass,
          googleId,
        });
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            role: "alumno",
            isAdmin: user.isAdmin,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1y" }
        );
        logger.info("usuario creado");
        return {
          token,
          user,
        };
      } catch (error) {
        logger.error(error);
      }
    },
    agregarEmpresa: async (parent, { name, email, password, linkPage }) => {
      try {
        pass = await CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_ENCRYPT
        ).toString();
        const user = await Company.create({
          name,
          email,
          password: pass,
          linkPage,
        });
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: "empresa" },
          process.env.SECRET_KEY,
          { expiresIn: "1y" }
        );
        logger.info("usuario creado");
        return {
          token,
          user,
        };
      } catch (error) {
        logger.error("rompio en agregar empresa");
      }
    },
    borrarAlumno: async (parent, { _id }) => {
      return await Student.findByIdAndDelete(_id);
    },
    borrarEmpresa: async (parent, { _id }) => {
      return await Company.findByIdAndDelete(_id);
    },
    modificarAlumno: async (parent, { _id, alumno }) => {
      logger.info("mutation modificarAlumno by ID");
      return await Student.findByIdAndUpdate(_id, alumno, { new: true });
    },
    modificarEmpresa: async (parent, { _id, empresa }) => {
      return await Company.findByIdAndUpdate(_id, empresa, { new: true });
    },
    agregarOferta: async (parent, args) => {
      return await JobOffer.create(args.oferta);
    },
    borrarOferta: async (parent, { _id }) => {
      return await JobOffer.findByIdAndDelete(_id);
    },
    modificarOferta: async (parent, { _id, oferta }) => {
      return await JobOffer.findByIdAndUpdate(_id, oferta, { new: true });
    },
    loginAlumno: async (_, { email, password }) => {
      try {
        const user = await Student.findOne({ email: email });
        if (!user) {
          throw new Error("No user with that email");
        }
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASSWORD_ENCRYPT
        );
        const decrypt = bytes.toString(CryptoJS.enc.Utf8);
        console.log(password);
        console.log(decrypt);
        if (password != decrypt) {
          throw new Error("Incorrect password");
        }
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            role: "alumno",
            isAdmin: user.isAdmin,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    loginEmpresa: async (_, { email, password }) => {
      try {
        const user = await Company.findOne({ email: email });
        if (!user) {
          throw new Error("No user with that email");
        }
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASSWORD_ENCRYPT
        );
        const decrypt = bytes.toString(CryptoJS.enc.Utf8);
        if (!(password === decrypt)) {
          throw new Error("Incorrect password");
        }
        // return jwt
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: "empresa" },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //
    agregarReview: async (_, { _id, review }) => {
      const student = await Student.findById(review._id);
      if (student) {
        await Student.findByIdAndUpdate(_id, { $push: { review: review } });
      }
      return student;
    },
    borrarReviews: async (_, { _id }) => {
      return await Student.findByIdAndUpdate(_id, { review: [] });
    },
    modificarReview: async (_, { _id, input }) => {
      return await Review.findByIdAndUpdate(_id, input, { new: true });
    },
    agregarNews: async (_, { news }) => {
      return await News.create(news);
    },
    borrarNews: async (_, { _id }) => {
      return await News.findByIdAndDelete(_id);
    },
    modificarNews: async (_, { _id, input }) => {
      return await News.findOneAndUpdate(_id, input, { new: true });
    },
    agregarAlumnoFavs: async (parent, { _id }) => {
      return await Favorites.create(_id);
    },
    createFavS: async (parent, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, "secretkey");
      return await Student.findByIdAndUpdate(user._id, {
        $push: {
          favorites: {
            offer: args.favorites.offer,
            offerID: args.favorites.offerID,
          },
        },
      });
    },
    deleteFavS: async (parent, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, "secretkey");
      return await Student.findByIdAndUpdate(user._id, {
        $pull: { favorites: { _id: args._id } },
      });
    },
    createFav: async (parent, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, process.env.SECRET_KEY);
      return await Company.findByIdAndUpdate(user._id, {
        $push: {
          favorites: {
            postulant: args.favorites.postulant,
            postulantID: args.favorites.postulantID,
            offer: args.favorites.offer,
            offerID: args.favorites.offerID,
          },
        },
      });
    },
    deleteFav: async (parent, args, context) => {
      if (!args.token) throw new Error("You are not authenticated");
      const user = jwt.verify(args.token, process.env.SECRET_KEY);
      return await Company.findByIdAndUpdate(user._id, {
        $pull: { favorites: { _id: args._id } },
      });
    },
    loginGoogleAlumno: async (_, { email, googleId }) => {
      try {
        const user = await Student.findOne({ email: email });
        if (!user) {
          throw new Error("No user with that email");
        }
        user.overwrite({
          googleId: googleId,
        });
        if (user.googleId !== googleId) {
          throw new Error("No user with that google id");
        }
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: "alumno" },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    loginGoogleEmpresa: async (_, { email, googleId }) => {
      try {
        const user = await Company.findOne({ email: email });
        if (!user) {
          throw new Error("No user with that email");
        }
        user.overwrite({
          googleId: googleId,
        });
        if (googleId !== user.googleId) {
          throw new Error("No user with that google id");
        }
        // return jwt
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: "empresa" },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    vincularGoogle: async (parent, args) => {
      try {
        const user = Student.findOne({ email: args.email });
        if (user) {
          user.update({
            googleId: args.googleId,
          });
          return await user;
        }
      } catch (err) {
        logger.error(err);
      }
    },
    resetearPasswordAlumno: async (_, args) => {
      const { email } = jwt.verify(args.token, process.env.SECRET_KEY);
      pass = await CryptoJS.AES.encrypt(
        args.password,
        process.env.PASSWORD_ENCRYPT
      ).toString();
      return await Student.findOneAndUpdate(
        { email: email },
        {
          password: pass,
        },
        { new: true }
      );
    },
    resetearPasswordEmpresa: async (_, args) => {
      const { email } = jwt.verify(args.token, process.env.SECRET_KEY);
      pass = await CryptoJS.AES.encrypt(
        args.password,
        process.env.PASSWORD_ENCRYPT
      ).toString();
      return await Company.findOneAndUpdate(
        { email: email },
        {
          password: pass,
        },
        { new: true }
      );
    },
    promoverAdmin: async (_, args) => {
      return await Student.findOneAndUpdate(
        { email: args.email },
        {
          isAdmin: true,
        },
        { new: true }
      );
    },
    bajarAdmin: async (_, args) => {
      return await Student.findOneAndUpdate(
        { email: args.email },
        {
          isAdmin: false,
        },
        { new: true }
      );
    },
  },
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

module.exports = { resolvers };
