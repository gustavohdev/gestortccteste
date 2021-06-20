const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Company = require("../models/company");
const Motor = require("../models/motor");
const Brand = require("../models/brand");
const Client = require("../models/client");
const Car = require("../models/car");
const Status = require("../models/status");
const Os = require("../models/os");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("1050898059897-mid4964gbhqiptdmsor1qk1ussdb0id5.apps.googleusercontent.com");

// USERS
router.get("/users", (req, res, next) => {
    let username = req.query.username;
    let password = req.query.password;
    let companyid = req.query.companyid;

    if (!companyid) {
        User.find({ username: username, password: password })
            .then((data) => res.json(data))
            .catch((err) => res.status(401).json("Error: " + err));
    } else {
        User.find({ control: 1, companyid: companyid })
            .then((data) => res.json(data))
            .catch((err) => res.status(401).json("Error: " + err));
    }
});

router.post("/users", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const control = req.body.control;
        const usertype = req.body.usertype;
        const companyid = req.body.companyid;

        const newUser = new User({
            username,
            email,
            password,
            control,
            usertype,
            companyid,
        });

        newUser
            .save()
            .then(() => res.json("User added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/users", async (req, res, next) => {
    let companyid = req.body.companyid;
    let _id = req.body._id;

    try {
        const newData = await User.findByIdAndUpdate({ _id: _id }, { companyid: companyid });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/users/team", async (req, res, next) => {
    let companyid = req.body.companyid;
    let _id = req.body._id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    try {
        const newData = await User.findByIdAndUpdate({ _id: _id, companyid: companyid }, { username: username, email: email, password: password });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/users/:id", (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/auth/google", async (req, res, next) => {
    if (req.body) {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "1050898059897-mid4964gbhqiptdmsor1qk1ussdb0id5.apps.googleusercontent.com",
        });
        const { name, email, picture } = ticket.getPayload();

        console.log(name);
        console.log(email);
        console.log(picture);

        const newData = await User.findOneAndUpdate({ username: name }, { username: name, email: email, password: token, usertype: 0, control: 0 }, { new: true, upsert: true });

        res.json(newData);
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

//COMPANY

router.get("/companies", (req, res, next) => {
    let usernameid = req.query.usernameid;

    if (!req.query.usernameid) {
        Company.find({})
            .then((data) => res.json(data))
            .catch(next);
    } else {
        Company.find({ usernameid: usernameid })
            .then((data) => res.json(data))
            .catch(next);
    }
});

router.post("/companies", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const company = req.body.company;
        const usernameid = req.body.usernameid;

        const newCompany = new Company({
            usernameid,
            company,
        });

        newCompany
            .save()
            .then(() => res.json("Company added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/companies", async (req, res, next) => {
    let companyid = req.body.companyid;
    let name = req.body.name;
    let _id = req.body._id;

    try {
        const newData = await Company.findByIdAndUpdate({ companyid: companyid, _id: _id }, { company: name });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

// CLIENT

router.get("/clients", (req, res, next) => {
    const companyid = req.query.companyid;

    if (!companyid) {
        Client.find({})
            .then((data) => res.json(data))
            .catch(next);
    } else {
        Client.find({ companyid: companyid })
            .then((data) => res.json(data))
            .catch(next);
    }
});

router.post("/clients", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const companyid = req.body.companyid;
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.email;
        const cellphone = req.body.cellphone;

        const newClient = new Client({
            name,
            surname,
            email,
            cellphone,
            companyid,
        });

        newClient
            .save()
            .then(() => res.json("Client added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/clients", async (req, res, next) => {
    const _id = req.body._id;
    const companyid = req.body.companyid;
    const name = req.body.name;
    const surname = req.body.surname;
    const cellphone = req.body.cellphone;
    const email = req.body.email;

    try {
        const newData = await Client.findByIdAndUpdate({ companyid: companyid, _id: _id }, { name: name, surname: surname, cellphone: cellphone, email: email });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

// BRAND
router.get("/brands", (req, res, next) => {
    const companyid = req.query.companyid;

    Brand.find({ companyid: companyid })
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/brands", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const name = req.body.name;
        const companyid = req.body.companyid;

        const newBrand = new Brand({
            name,
            companyid,
        });

        newBrand
            .save()
            .then(() => res.json("Brand added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/brands", async (req, res, next) => {
    const companyid = req.body.companyid;
    const name = req.body.name;
    const _id = req.body._id;

    try {
        const newData = await Brand.findByIdAndUpdate({ companyid: companyid, _id: _id }, { name: name });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

// MOTOR
router.get("/motors", (req, res, next) => {
    const companyid = req.query.companyid;

    Motor.find({ companyid: companyid })
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/motors", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const name = req.body.name;
        const companyid = req.body.companyid;

        const newMotor = new Motor({
            name,
            companyid,
        });

        newMotor
            .save()
            .then(() => res.json("Motor added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/motors", async (req, res, next) => {
    const companyid = req.body.companyid;
    const name = req.body.name;
    const _id = req.body._id;

    try {
        const newData = await Motor.findByIdAndUpdate({ companyid: companyid, _id: _id }, { name: name });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

// STATUS
router.get("/status", (req, res, next) => {
    const companyid = req.query.companyid;

    Status.find({})
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/status", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const name = req.body.name;
        const id = req.body.id;

        const newStatus = new Status({
            name,
            id,
        });

        newStatus
            .save()
            .then(() => res.json("Status added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

// CAR
router.get("/cars", (req, res, next) => {
    let companyid = req.query.companyid;
    let userid = req.query.userid;
    let plate = req.query.plate;

    if (userid != undefined && plate != undefined) {
        Car.find({ userid: userid, companyid: companyid, plate: plate })
            .then((data) => res.json(data))
            .catch(next);
    } else if (userid == undefined) {
        Car.find({ companyid: companyid })
            .then((data) => res.json(data))
            .catch(next);
    } else {
        Car.find({ userid: userid, companyid: companyid })
            .then((data) => res.json(data))
            .catch(next);
    }
});

router.post("/cars", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const userid = req.body.userid;
        const companyid = req.body.companyid;
        const brand = req.body.brand;
        const model = req.body.model;
        const motor = req.body.motor;
        const plate = req.body.plate;

        const newCar = new Car({
            userid,
            companyid,
            brand,
            model,
            motor,
            plate,
        });

        newCar
            .save()
            .then(() => res.json("Car added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/cars", async (req, res, next) => {
    const _id = req.body._id;
    const companyid = req.body.companyid;
    const brand = req.body.brand;
    const model = req.body.model;
    const motor = req.body.motor;
    const plate = req.body.plate;

    try {
        const newData = await Car.findByIdAndUpdate({ companyid: companyid, _id: _id }, { brand: brand, model: model, motor: motor, plate: plate });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

// OS
router.get("/os", (req, res, next) => {
    let companyid = req.query.companyid;
    Os.find({ companyid: companyid })
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/os", (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const companyid = req.body.companyid;
        const brand = req.body.brand;
        const model = req.body.model;
        const motor = req.body.motor;
        const plate = req.body.plate;
        const obs = req.body.obs;
        const status = req.body.status;

        const newOs = new Os({
            companyid,
            brand,
            model,
            motor,
            plate,
            obs,
            status,
        });

        newOs
            .save()
            .then(() => res.json("Os added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        res.json({
            error: "some error on mongoose or endpoint wrong",
        });
    }
});

router.patch("/os", async (req, res, next) => {
    let companyid = req.body.companyid;
    let status = req.body.status;
    let _id = req.body._id;

    try {
        const newData = await Os.findByIdAndUpdate({ companyid: companyid, _id: _id }, { status: status });
        await newData.save();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
