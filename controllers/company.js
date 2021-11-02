const CompanyCategory = require("../models/company_category");
const Company = require("../models/company");

const companyController = {
  getAllCompany: async (req, res) => {
    try {
      const { page, size } = req.query;
      const limit = parseInt(size) || 10;
      const skip = (parseInt(page) || 0) * limit;
      const companies = await Company.find()
        .skip(skip)
        .limit(limit)
        .populate("category_id", "title");
      res.send({ ok: true, data: companies });
    } catch (error) {
      res.status(400).send({
        ok: false,
        error: true,
        message: "Error while getting company",
      });
    }
  },
  getCompanyById: async (req, res) => {
    try {
      const { companyId } = req.params;
      const company = await Company.findOne({ _id: companyId }).populate(
        "category_id",
        "title"
      );
      res.send({ ok: true, data: company });
    } catch (error) {
      res.status(400).send({
        ok: false,
        error: true,
        message: "Error while getting company",
      });
    }
  },
  addCompany: async (req, res) => {
    try {
      const { category_id, title, image, description, status } = req.body;
      const category = await CompanyCategory.findById(category_id);
      if (!category) {
        res.status(404).send({
          ok: false,
          message: "Company Category not found",
        });
        return;
      }
      const company = await Company.create({
        category_id,
        title,
        image,
        description,
        status,
      });
      res.send({ ok: true, data: company });
    } catch (error) {
      res.status(400).send({
        ok: false,
        error: true,
        message: "Error while adding company",
      });
    }
  },
  updateCompany: async (req, res) => {
    try {
      const { companyId } = req.params;
      const updateCompany = await Company.findByIdAndUpdate(
        companyId,
        req.body,
        { new: true }
      );
      if (!updateCompany) {
        res.status(404).send({ ok: false, message: "Company not available." });
        return;
      }
      res.send({ ok: true, data: updateCompany });
    } catch (error) {
      res
        .status(400)
        .send({ ok: false, error: true, message: "Error updating Company." });
    }
  },

  deleteCompany: async (req, res) => {
    try {
      const { companyId } = req.params;
      const deleteCompany = await Company.findByIdAndDelete(companyId);
      if (!deleteCompany) {
        res.status(404).send({ ok: false, message: "Company not available." });
        return;
      }
      res.send({
        ok: true,
        message: "Delete Company Success.",
        data: deleteCompany,
      });
    } catch (error) {
      res
        .status(400)
        .send({ ok: false, error: true, message: "Error deleting Company." });
    }
  },
};

module.exports = companyController;
