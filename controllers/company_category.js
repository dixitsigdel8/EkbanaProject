const CompanyCategory = require("../models/company_category");

const companyCategoryController = {
  getAllCategory: async (req, res) => {
    try {
      const { page, size } = req.query;
      const limit = parseInt(size) || 10;
      const skip = (parseInt(page) || 0) * limit;
      const categories = await CompanyCategory.find().skip(skip).limit(limit);
      res.send({ ok: true, data: categories });
    } catch (error) {
      res.status(500).send({
        ok: false,
        error: true,
        message: "Error getting company categories",
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { companyCategoryId } = req.params;
      const category = await CompanyCategory.findOne({
        _id: companyCategoryId,
      });
      res.send({ ok: true, data: category });
    } catch (error) {
      res
        .status(500)
        .send({ ok: false, error: true, message: "Error getting category" });
    }
  },

  addCompanyCategory: async (req, res) => {
    try {
      const { title } = req.body;

      const companyCategory = await CompanyCategory.create({ title });
      res.send({
        ok: true,
        message: "Company Category addes successfully.",
        data: companyCategory,
      });
    } catch (error) {
      res
        .status(400)
        .send({ ok: false, message: "Error adding company category." });
    }
  },

  updateCompanyCategory: async (req, res) => {
    try {
      const { companyCategoryId } = req.params;
      const updateCategory = await CompanyCategory.findByIdAndUpdate(
        companyCategoryId,
        req.body,
        {
          new: true,
        }
      );
      if (!updateCategory) {
        res.status(404).send({ ok: false, message: "Category not available." });
        return;
      }
      res.send({ ok: true, data: updateCategory });
    } catch (error) {
      res
        .status(400)
        .send({ ok: false, error: true, message: "Error updating Category." });
    }
  },

  deleteCompanyCategory: async (req, res) => {
    try {
      const { companyCategoryId } = req.params;
      const deleteCompanyCategory = await CompanyCategory.findByIdAndDelete(
        companyCategoryId
      );
      if (!deleteCompanyCategory) {
        res
          .status(404)
          .send({ ok: false, message: "Company Category not available." });
        return;
      }
      res.send({
        ok: true,
        message: "Delete company category",
        data: deleteCompanyCategory,
      });
    } catch (error) {
      res
        .status(400)
        .send({ ok: false, error: true, message: "Error deleting Category." });
    }
  },
};
module.exports = companyCategoryController;
