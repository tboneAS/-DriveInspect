# DriveInspect

DriveInspect is a modern, mobile-first web application for structured used-car inspection and objective deal evaluation.

## Features
- Role selector for **Admin**, **Inspector**, and **Customer** access context.
- 5-step inspection wizard:
  1. Basic data
  2. Exterior check
  3. Interior check
  4. Engine & technical
  5. Test drive
- Weighted scoring engine:
  - Exterior 20%
  - Interior 15%
  - Engine & Technical 35%
  - Test Drive 20%
  - Price Evaluation 10%
- Price intelligence (Undervalued/Fair Price/Overpriced) with deviation %.
- Automated defect insights and recommendations.
- Professional report output with score bars, repair estimate range, PDF export guidance, and shareable link.
- Dashboard KPIs:
  - Total inspections
  - Average score
  - Deals vs bad cars ratio
  - Recent inspections
- Business features:
  - Free / Pro pricing cards
  - Book Inspection CTA
  - Contact form
- Local history persistence using browser localStorage.

## Run locally
Open `index.html` in any modern browser.

## Test link (shareable report)
1. Fill out the inspection wizard and click **Generate Report**.
2. Copy the generated **Shareable link** from the report section.
3. Open that URL to view the same report in shared mode.

Example format:
`http://localhost:8080/index.html?report=<encoded_payload>`
