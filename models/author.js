const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  date_of_birth: {
    type: Date,
  },
  date_of_death: {
    type: Date,
  },
});

AuthorSchema.virtual('name').get(function () {
  let fullName = '';
  if (this.first_name && this.family_name) {
    fullName = `${this.first_name}, ${this.family_name}`;
  }
  return fullName;
});

AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATETIME_MED
      )
    : '';
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(
        DateTime.DATETIME_MED
      )
    : '';
});

AuthorSchema.virtual('lifespan').get(function () {
  DOD = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(
        DateTime.DATETIME_MED
      )
    : '';

  DOB = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATETIME_MED
      )
    : '';

  return `${DOB} - ${DOD}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
