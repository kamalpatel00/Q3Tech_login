const db = require("../models");
const Tutorial = db.Tutorials;
const Op = db.Sequelize.Op;


// create otp function
const generateOtp = (()=>{
  return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
})

// differerent bw 2 dates
function getMinutesBetweenDates(startDate, endDate) {
  var diff = endDate.getTime() - startDate.getTime();
  return (diff / 60000);
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.mobile) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
//find exist 

  // Create a Tutorial
  const user = {
    title: req.body.title,
    mobile: req.body.mobile,
    otp: generateOtp(),
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.mobile;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition }, {attributes: ['mobile', 'otp']})
    .then(data => {
      const resObj = {
        success: true,
        data
      }
      res.status(200).send(resObj);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tutorials."
      });
    });
};

// Verify Otp
exports.verifyOtp = (req, res) => {
  const { mobile, otp } = req.body;
  // console.log(mobile);
  Tutorial.findOne({where : [{mobile: mobile}, {otp: otp}]}, {attributes: ['mobile', 'otp']})
    .then(data => {
      // console.log('-->',JSON.parse(JSON.stringify(data)))
      let Tutorial = JSON.parse(JSON.stringify(data))
      // console.log("Tutorial=",Tutorial);
      const diffTime = getMinutesBetweenDates(new Date(Tutorial.updatedAt), new Date())
      // console.log('diffTime-',diffTime);
      if( diffTime > 10 ){
        res.send({message: "OTP has been Expired."});
      }
      const respObj = {
        message: "Logged in Successfully",
        mobile: data.mobile,

      }
      res.send(respObj);
    })
    .catch(err => {
      res.status(500).send({
        message: "Invalid Mobile or OTP"
      });
    });
};

// Resend Otp
exports.resendOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  let updateObj = {
    otp: generateOtp()
  }
  const data = await Tutorial.update(updateObj, {where : {mobile: mobile}})
    const user = await Tutorial.findAll({ where: {mobile: mobile}})
    const respObj = {
      message: 'success',
      mobile,
      otp: user[0].otp
    }
    console.log(respObj);
    res.send(respObj);
};

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Tutorial with id=" + id
//       });
//     });
// };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  console.log("mobile");
  const {mobile} = req.params;
  console.log(mobile);

  Tutorial.destroy({
    where: { mobile: mobile }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with mobile=${mobile}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {mobile: req.body.mobile},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Tutorials."
//       });
//     });
// };

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tutorials."
      });
    });
};
