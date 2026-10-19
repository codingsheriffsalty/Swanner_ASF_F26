import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

export default function MenuFilter({ category, onChange }) {
  return (
    <FormGroup className="filter-control">
      <Label for="category-filter">Filter by category</Label>
      <Input id="category-filter" type="select" value={category} onChange={(event) => onChange(event.target.value)}>
        {["All", "Breakfast", "Lunch", "Dinner"].map((option) => <option key={option}>{option}</option>)}
      </Input>
    </FormGroup>
  );
}
