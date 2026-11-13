# Scenario fixtures

scenarios.json defines the first end-to-end acceptance scope. These are planned cases, not recorded passes. The working prototype still contains its imported sample dataset in assets/app.js; extracting that data into shared fixtures is part of the source migration.

Use stable account, beneficiary, product/package/temple, parent, occurrence, payment and asset IDs. Preserve the distinction between a production-observed catalogue snapshot and fictional account/booking examples. Keep fixed clock, locale and timezone in the fixture metadata. Never add real customer booking data to the design repo.
