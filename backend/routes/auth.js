var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const bcrypt = require("bcrypt");

router.post("/Register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    const users = await DButils.selectUsernames();

    if (users.find((x) => x.email === req.body.email)) {
      throw { status: 409, message: "email taken" };
    }
    // make new password
    await DButils.insertUserToUser(req.body.userID, req.body.firstName, req.body.email);

    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    // const users = await DButils.execQuery("SELECT username FROM users");
    const users = await DButils.selectUsernames();
    if (!users.find((x) => x.email === req.body.email)) {
      throw { status: 401, message: `No email: '${req.body.email}' in the system` };
    }
    // check that the password is correct
    const user = (await DButils.selectUserWithUsername(req.body.email))[0];

    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

router.get("/getUserID", async (req, res, next) => {

  try {
    const {email} = req.query;
    const user = (await DButils.selectUserIDWithUsername(email))[0];
    res.status(200).send({ user});
  } catch (error) {
    next(error);
  }
});

router.get("/getStepMessage", async (req, res, next) => {

  try {
    const {step} = req.query;
    const message = (await DButils.selectMassegeByStep(step))[0];
    res.status(200).send({message});
  } catch (error) {
    next(error);
  }

});


module.exports = router;
