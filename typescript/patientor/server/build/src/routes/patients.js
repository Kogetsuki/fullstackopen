"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.get('/', (_req, res) => res.send(patientService_1.default.getAll()));
router.post('/', middleware_1.newPatientParser, (req, res) => {
    const addedPatient = patientService_1.default.addPatient(req.body);
    res.json(addedPatient);
});
router.use(middleware_1.errorMiddleware);
exports.default = router;
//# sourceMappingURL=patients.js.map