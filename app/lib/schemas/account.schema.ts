import * as v from "valibot";

export const AccountSchema = v.object({
  idNo: v.pipe(
    v.string("Ensure you provide a real ID."),
    v.minLength(7, "Ensure you provide a real ID.")
  ),
  DOB: v.pipe(v.date()),
  gender: v.pipe(v.number("Please choose one of the genders provided.")),
  phoneNumber: v.pipe(
    v.string("Ensure you provide a real phone number."),
    v.minLength(2, "Ensure you provide a real phone number.")
  ),
  alternatePhoneNumber: v.pipe(
    v.string("Ensure you provide a real phone number.")
  ),
  email: v.pipe(
    v.string("Ensure you provide a real email."),
    v.email("Ensure you provide a real email.")
  ),
  postalAddress: v.pipe(
    v.string("Ensure you provide a real postal address."),
    v.minLength(2, "Ensure you provide a real postal address.")
  ),
  country: v.pipe(
    v.string("Please choose one of the countries provided."),
    v.minLength(2, "Please choose one of the countries provided.")
  ),
  county: v.pipe(
    v.string("Ensure you type in a county"),
    v.minLength(2, "Ensure the county has at least 2 characters")
  ),
  religion: v.pipe(
    v.string("Please choose one of the religions provided."),
    v.minLength(2, "Please choose one of the religions provided.")
  ),
});
