import assert from "node:assert/strict";
import test from "node:test";
import supermoveResponseModule from "../lib/supermoveResponse.js";

const { getSupermoveValidationError } = supermoveResponseModule;

test("detects a SuperMove validation error returned in a 2xx response", () => {
  const response = JSON.stringify({
    response: {
      data: [
        { field: "tags[1]", message: "Tag does not exist." },
        { field: "tags[2]", message: "Tag does not exist." },
      ],
    },
    error: "Validation Error",
  });

  assert.equal(getSupermoveValidationError(response), "Tag does not exist.; Tag does not exist.");
});

test("accepts an ordinary successful SuperMove response", () => {
  assert.equal(getSupermoveValidationError(JSON.stringify({ project: { id: 1234 } })), null);
  assert.equal(getSupermoveValidationError(""), null);
});

test("detects a top-level SuperMove error", () => {
  assert.equal(getSupermoveValidationError(JSON.stringify({ error: "Validation Error" })), "Validation Error");
});
