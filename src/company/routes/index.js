const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../users/middleware/authMiddleware.js');

const { createCompany, updateCompany, deleteCompany, getCompanyProfile } = require('../controllers/index.js');

router.post('company/create',
    // protect,
    // authorize('company.create'),
    createCompany
);

router.patch('/company/update/:id',
    protect,
    authorize('company.update'),
    updateCompany
);

router.delete('/company/delete/:id',
    protect,
    authorize('company.delete'),
    deleteCompany
);

router.get(
    "/company/profile",
    protect,
    authorize('company.profile'),
    getCompanyProfile
)

module.exports = router;