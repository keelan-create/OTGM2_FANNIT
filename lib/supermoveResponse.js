function getSupermoveValidationError(responseText) {
  if (!responseText) return null;

  try {
    const payload = JSON.parse(responseText);
    const errors = payload?.response?.data;

    if (Array.isArray(errors) && errors.length) {
      return errors
        .map((error) => error?.message || error?.field || "Validation error")
        .join("; ");
    }

    if (payload?.error) {
      return typeof payload.error === "string" ? payload.error : "SuperMove validation error";
    }
  } catch {
    // A non-JSON success response is accepted unless the HTTP status says otherwise.
  }

  return null;
}

module.exports = { getSupermoveValidationError };
