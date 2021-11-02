const companyCategoryController = require("../controllers/company_category");
const key = require("../middleware/access");
const router = require("express").Router();

router.get("/category", key, companyCategoryController.getAllCategory);
router.get(
  "/category/:companyCategoryId",
  key,
  companyCategoryController.getCategoryById
);
router.post("/category", key, companyCategoryController.addCompanyCategory);
router.patch(
  "/category/:companyCategoryId",
  key,
  companyCategoryController.updateCompanyCategory
);
router.delete(
  "/category/:companyCategoryId",
  key,
  companyCategoryController.deleteCompanyCategory
);
module.exports = router;
