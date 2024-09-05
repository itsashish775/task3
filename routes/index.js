const express = require("express")
const publicController = require("../controller/public.controller")
const upload = require("../middleware/upload")
const router = express.Router()

// router.get("/*", async (req, res) => {
//     res.status(400).json({ message: "Invalid route" })
// })


router.post("/upload-image", upload.single('file'), publicController.uploadImage)
router.post("/upload-video", upload.single('file'), publicController.uploadVideo)
router.post("/register", publicController.register)
router.get("/getAllCustomer", publicController.getAllCustomer)
router.get("/getCustomerById/:id", publicController.getCustomerById)
router.post("/updateCustomerById/:id", publicController.updateCustomerById)



module.exports = router