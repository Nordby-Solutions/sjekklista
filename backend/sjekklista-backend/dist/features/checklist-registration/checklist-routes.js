"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checklist_registration_1 = require("./contracts/checklist-registration");
const router = (0, express_1.Router)();
router.get("/checklist-registration", (req, res) => {
    res.json([{ name: "Cool" }]);
});
router.post("/checklist-registration", (req, res) => {
    const result = checklist_registration_1.checklistRegistrationSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }
    console.log("REQ:", JSON.stringify(result.data));
    res.json(result.data);
});
exports.default = router;
