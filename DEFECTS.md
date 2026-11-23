# LittleCart – Defect Report

> **Project:** LittleCart – Mini Checkout and Browser Test Suite  
> **Version:** 1.0  
> **Prepared by:** Hackathon Team  

---

## Summary

After executing all five test cases (3 automated + 2 manual) on version 1.0 of LittleCart, **no defects were identified**.

All tests passed successfully on the first run. The application behaved as expected across all scenarios tested.

---

## Defect Log

| Defect ID | Description | Severity | Status |
|---|---|---|---|
| — | No defects found | — | — |

---

## Test Coverage Statement

The following scenarios were tested and found to be functioning correctly:

1. **Successful checkout flow** — product added, name entered, order placed, confirmation displayed with correct reference and total.
2. **Empty cart validation** — checkout blocked, error message displayed.
3. **Missing name validation** — checkout blocked, inline error message displayed, cart unchanged.
4. **Quantity and total calculation** — line totals and order total calculated correctly after quantity changes.
5. **Rapid double-click protection** — only one order confirmation generated, button disabled on first click.

---

## Notes

- No defects were invented or fabricated. This report reflects actual test execution outcomes.
- If defects are found in future test cycles, they will be documented with:
  - Defect ID (e.g., DEF-001)
  - Description of the issue
  - Reproducible steps
  - Expected vs. actual result
  - Screenshot evidence
  - Severity (Critical / High / Medium / Low)
  - Status (Open / Fixed / Verified)
