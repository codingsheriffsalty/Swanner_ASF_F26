import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";

const schema = yup.object({
  name: yup.string().trim().required("Name is required.").max(20, "Name must be 20 characters or fewer."),
  email: yup.string().trim().required("Email is required.").email("Enter a valid email address."),
  partySize: yup.number().typeError("Choose a party size.").required("Party size is required.").min(1, "Party size must be at least 1.").max(8, "Party size cannot exceed 8."),
  date: yup.string().required("Date is required."),
  time: yup.string().required("Time is required."),
  seating: yup.string().required("Choose a seating preference."),
  dietaryNotes: yup.string().max(30, "Dietary notes must be 30 characters or fewer."),
  newsletter: yup.boolean()
});
// you have found my hidden comment. a winner is you //
export default function ReservationsPage() {
  const [success, setSuccess] = useState("");
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", partySize: "", date: "", time: "", seating: "", dietaryNotes: "", newsletter: false },
    mode: "onSubmit"
  });
  const notes = watch("dietaryNotes") || "";
  const today = new Date().toISOString().split("T")[0];

  const submit = (values) => {
    setSuccess(`Thanks, ${values.name}! Your reservation request has been received. This is a demo confirmation; no booking has been sent to a server.`);
    reset();
  };

  const field = (name) => ({
    ...register(name),
    invalid: Boolean(errors[name]),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined
  });

  return (
    <main className="page-background reservations-page">
      <Container className="py-5">
        <header className="page-heading">
          <h1>Reserve a Table</h1>
          <p>Reservations are request only. Our chocolate shop is hidden beneath the city, so we review every request before confirming your table.</p>
        </header>
        <div className="reservation-section card">
          <Row className="g-4 align-items-start">
            <Col lg="5"><img src="/images/img3.png" alt="Chocolate desserts at The Freepaw Underground" className="reservation-image" /></Col>
            <Col lg="7">
              {success && <Alert color="success" toggle={() => setSuccess("")} role="status">{success}</Alert>}
              <Form noValidate onSubmit={handleSubmit(submit)}>
                <FormGroup>
                  <Label for="name">Name *</Label>
                  <Input id="name" autoComplete="name" maxLength="20" {...field("name")} />
                  {errors.name && <FormFeedback id="name-error">{errors.name.message}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email *</Label>
                  <Input id="email" type="email" autoComplete="email" {...field("email")} />
                  {errors.email && <FormFeedback id="email-error">{errors.email.message}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                  <Label for="partySize">Party Size *</Label>
                  <Input id="partySize" type="select" {...field("partySize")}>
                    <option value="">Select party size</option>
                    {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}</option>)}
                  </Input>
                  {errors.partySize && <div id="partySize-error" className="field-error">{errors.partySize.message}</div>}
                </FormGroup>
                <Row>
                  <Col sm="6"><FormGroup><Label for="date">Date *</Label><Input id="date" type="date" min={today} {...field("date")} />{errors.date && <FormFeedback id="date-error">{errors.date.message}</FormFeedback>}</FormGroup></Col>
                  <Col sm="6"><FormGroup><Label for="time">Time *</Label><Input id="time" type="time" {...field("time")} />{errors.time && <FormFeedback id="time-error">{errors.time.message}</FormFeedback>}</FormGroup></Col>
                </Row>
                <fieldset className="seating-fieldset">
                  <legend>Seating Preference *</legend>
                  {["Cozy Booth", "Communal Table", "Window Seat"].map((option) => (
                    <FormGroup check key={option} className="mb-2">
                      <Input id={option.replaceAll(" ", "-")} type="radio" value={option} {...register("seating")} invalid={Boolean(errors.seating)} />
                      <Label check for={option.replaceAll(" ", "-")}>{option}</Label>
                    </FormGroup>
                  ))}
                  {errors.seating && <div className="field-error">{errors.seating.message}</div>}
                </fieldset>
                <FormGroup>
                  <Label for="dietaryNotes">Dietary Notes (optional)</Label>
                  <Input id="dietaryNotes" type="textarea" rows="2" maxLength="30" placeholder="Allergies or dietary requests" {...field("dietaryNotes")} />
                  <small className="character-counter">{notes.length}/30 characters</small>
                  {errors.dietaryNotes && <FormFeedback id="dietaryNotes-error">{errors.dietaryNotes.message}</FormFeedback>}
                </FormGroup>
                <FormGroup check className="newsletter-option">
                  <Input id="newsletter" type="checkbox" {...register("newsletter")} />
                  <Label check for="newsletter">Sign me up for the Underground newsletter.</Label>
                </FormGroup>
                <Button color="primary" type="submit" className="mt-3">Submit Reservation Request</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </main>
  );
}
