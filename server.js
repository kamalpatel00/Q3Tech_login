const express = require("express");
const cors = require("cors");
const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
swaggerDocument = require('./app/swagger.json');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// app.use(
//   '/api-docs',
//   swaggerUi.serve, 
//   swaggerUi.setup(swaggerDocument)
// );
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// Swagger
  // const swaggerOptions = {
  //   swaggerDefinition:{
  //     info:{
  //       title: 'User login Api',
  //       veersion: '1.0.0'
  //     }
  //   },
  //   apis:['server.js'],
  // }

  // const swaggerDocs = swaggerJsDoc(swaggerOptions)
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User login
 */

/**
 * @swagger
 * /api/tutorials/:
 *   post:
 *     summary: Register user
 *     description: Register by mobile.
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/model'
 *
 */

/**
 * @swagger
 * /api/tutorials/verifyOtp/:
 *   post:
 *     summary: Verify OTP 
 *     description: OTP verification.
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - otp
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *               otp:
 *                 type: number
 *                 example: 123456
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/model'
 *
 */



/**
 * @swagger
 * /api/tutorials/resendOtp/:
 *   post:
 *     summary: Resend OTP
 *     description: Resend OTP.
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       "200":
 *         description: Resend OTP
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/model'
 *
 */


/**
 * @swagger
 * /api/tutorials/{mobile}:
 *   delete:
 *     summary: Delete User
 *     description: Delete User.
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: mobile
 *         required: true
 *         schema:
 *           type: string
 *         description: Mobile Number
 *     responses:
 *       "200":
 *         description: Delete user
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/model'
 *
 */

// 



// 2222222222222222222222222222
const options = {
  definition:{
    openapi: '3.0.0',
    info:{
      title: 'Node.js login api',
      version: '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:4001/'
      }
    ]
  },
  apis: ['./server.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 









const db = require("./app/models");
db.sequelize.sync({force: false})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Home." });
});







require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4001;
module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;