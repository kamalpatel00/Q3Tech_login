module.exports = app => {
  const Tutorials = require("../controllers/tutorial.controller.js");
  const validate = require('../middlewares/validate');
  const TutorialValidation = require('../../app/validation/user.validation');

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", validate(TutorialValidation.createTutorial), Tutorials.create);

  // Retrieve all Tutorials
  router.get("/", Tutorials.findAll);

   // Resend otp
   router.post("/resendOtp", validate(TutorialValidation.createTutorial), Tutorials.resendOtp);

     // Verify otp
     router.post("/verifyOtp", validate(TutorialValidation.verifyOtp), Tutorials.verifyOtp);

  // // Retrieve all published Tutorials
  // router.get("/published", Tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", Tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", Tutorials.update);

  // // Delete a Tutorial with id
  router.delete("/:mobile", Tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", Tutorials.deleteAll);

  app.use("/api/Tutorials", router);
};

