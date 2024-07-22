import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "@/app/components/Library.module.css";

const RegistrationForm = ({ show, onHide, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [schoolOrInstitution, setSchoolOrInstitution] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [schoolType, setSchoolType] = useState({
    primary: false,
    secondary: false,
    university: false,
    privateSchool: false,
    other: false,
  });
  const [levelsTaught, setLevelsTaught] = useState({
    beginner: false,
    elementary: false,
    intermediate: false,
    upperIntermediate: false,
    advanced: false,
  });
  const [teachingInterests, setTeachingInterests] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const handleSchoolTypeChange = (type) => {
    setSchoolType((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type],
    }));
  };

  const handleLevelsTaughtChange = (level) => {
    setLevelsTaught((prevLevels) => ({
      ...prevLevels,
      [level]: !prevLevels[level],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email !== confirmEmail) {
      alert("Email and confirm email must match.");
      return;
    }

    onSubmit({
      firstName,
      familyName,
      email,
      schoolOrInstitution,
      address1,
      address2,
      postcode,
      country,
      schoolType,
      levelsTaught,
      teachingInterests,
      agreedToPolicy,
    });

    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setFamilyName("");
    setEmail("");
    setConfirmEmail("");
    setSchoolOrInstitution("");
    setAddress1("");
    setAddress2("");
    setPostcode("");
    setCountry("");
    setSchoolType({
      primary: false,
      secondary: false,
      university: false,
      privateSchool: false,
      other: false,
    });
    setLevelsTaught({
      beginner: false,
      elementary: false,
      intermediate: false,
      upperIntermediate: false,
      advanced: false,
    });
    setTeachingInterests("");
    setAgreedToPolicy(false);
  };

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Account Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontWeight: "600" }}>
          Complete the form below and we will email log in details after
          validating your teacher status.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>First name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFamilyName" className="mb-3">
            <Form.Label>Last name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter family name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group
            controlId="formConfirmEmail"
            style={{ marginBottom: "3rem" }}
          >
            <Form.Label>Confirm email address *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Confirm email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSchoolOrInstitution" className="mb-3">
            <Form.Label>School or Institution *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter school or institution"
              value={schoolOrInstitution}
              onChange={(e) => setSchoolOrInstitution(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSchoolAddress">
            <Form.Group controlId="formAddress1" className="mb-3">
              <Form.Label>Address 1 *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress2" className="mb-3">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPostcode" className="mb-3">
              <Form.Label>Postcode *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formCountry"
              style={{ marginBottom: "3rem" }}
            >
              <Form.Label>Country *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Group>

          <Form.Group
            controlId="formSchoolType"
            style={{ marginBottom: "1rem" }}
            className="mb-3"
          >
            <Form.Label>School type *</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Primary"
                id="checkboxPrimary"
                checked={schoolType.primary}
                onChange={() => handleSchoolTypeChange("primary")}
              />
              <Form.Check
                type="checkbox"
                label="Secondary"
                id="checkboxSecondary"
                checked={schoolType.secondary}
                onChange={() => handleSchoolTypeChange("secondary")}
              />
              <Form.Check
                type="checkbox"
                label="University"
                id="checkboxUniversity"
                checked={schoolType.university}
                onChange={() => handleSchoolTypeChange("university")}
              />
              <Form.Check
                type="checkbox"
                label="Private school"
                id="checkboxPrivateSchool"
                checked={schoolType.privateSchool}
                onChange={() => handleSchoolTypeChange("privateSchool")}
              />
              <Form.Check
                type="checkbox"
                label="Other"
                id="checkboxOther"
                checked={schoolType.other}
                onChange={() => handleSchoolTypeChange("other")}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formLevelsTaught" className="mb-3">
            <Form.Label>Level(s) taught *</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Beginner"
                id="checkboxBeginner"
                checked={levelsTaught.beginner}
                onChange={() => handleLevelsTaughtChange("beginner")}
              />
              <Form.Check
                type="checkbox"
                label="Elementary"
                id="checkboxElementary"
                checked={levelsTaught.elementary}
                onChange={() => handleLevelsTaughtChange("elementary")}
              />
              <Form.Check
                type="checkbox"
                label="Intermediate"
                id="checkboxIntermediate"
                checked={levelsTaught.intermediate}
                onChange={() => handleLevelsTaughtChange("intermediate")}
              />
              <Form.Check
                type="checkbox"
                label="Upper intermediate"
                id="checkboxUpperIntermediate"
                checked={levelsTaught.upperIntermediate}
                onChange={() => handleLevelsTaughtChange("upperIntermediate")}
              />
              <Form.Check
                type="checkbox"
                label="Advanced"
                id="checkboxAdvanced"
                checked={levelsTaught.advanced}
                onChange={() => handleLevelsTaughtChange("advanced")}
              />
            </div>
          </Form.Group>

          <Form.Group
            controlId="formTeachingInterests"
            style={{ marginBottom: "3rem" }}
          >
            <Form.Label>Teaching interests</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter teaching interests"
              value={teachingInterests}
              onChange={(e) => setTeachingInterests(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAgreedToPolicy">
            <Form.Check
              type="checkbox"
              label={
                <>
                  By ticking this box, I confirm I am a teacher and have read
                  and agree to the{" "}
                  <Link
                    href="/Privacy"
                    className={classes.linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy and Data Policy
                  </Link>
                  .
                </>
              }
              id="checkboxPolicy"
              checked={agreedToPolicy}
              onChange={(e) => setAgreedToPolicy(e.target.checked)}
              required
            />
          </Form.Group>
          <div style={{ marginBottom: "3rem" }} />
          <Button variant="outline-success" type="submit">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationForm;
