const mongoose = require('mongoose');

const mapSchema1 = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Jobtitle: String,
    Company: String,
    ExperienceRequired: String,
    JobLocation: String,
    SkillsRequired: String,
    JobDescription: String,
    JobID: String,
    Salary: String,
    PostedOn: String,
    PostedBy: String,
    Vacancies: String,
    Role: String,
    Qualification: String,
    JobURL: String,
    MaximumSalary: String,
    Urgency:String,
    HostingPortal:String,
    ClosureDate: String,
    identityt: String
});

module.exports = mongoose.model('Product2', mapSchema1);