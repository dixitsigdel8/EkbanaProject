const companyController = require("../controllers/company");
const key = require("../middleware/access");

const router = require("express").Router();
router.get("/company", key, companyController.getAllCompany);
router.get("/company/:companyId", key, companyController.getCompanyById);
router.post("/company", key, companyController.addCompany);
router.patch("/company/:companyId", key, companyController.updateCompany);
router.delete("/company/:companyId", key, companyController.deleteCompany);
module.exports = router;
