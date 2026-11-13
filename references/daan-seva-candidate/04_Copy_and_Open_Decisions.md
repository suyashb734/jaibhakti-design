# Daan Seva copy and open decisions

Use consistent devotional language and make ongoing charges, dated fulfilment and evidence readiness clear. The product rules below come from the approved specification; sample names, amounts and dates are examples and must be replaced by the actual booking data.

## Shared terms and actions

| Current context | Use |
| --- | --- |
| Home Bookings or Profile My Orders | My Bookings |
| Profile helper | Track your Daan Sevas, certificates and videos |
| Recurring Sevas category | Nirantar Sevas |
| Ongoing booking type | Nirantar Daan Seva |
| Cadence | Weekly, Monthly, Every Amavasya, Every Ekadashi |
| Beneficiary | For Rohit Sharma · Kashyap gotra |
| Active ongoing booking | View Details |
| Upcoming dated occurrence | Track Seva Details |
| Completed and assets preparing | View Seva Details |
| Completed and videos ready | Watch Videos |
| Certificate ready | View Certificate |
| Retry state | View Payment Details |
| Inactive | Restart Nirantar Seva |
| Cancelled | Book This Seva Again |

Do not expose Chadhava in this Daan Seva experience. Standardise Dan Seva to Daan Seva. Agree ritual and temple spellings centrally; avoid silently merging the different examples in the supplied artboards. “Start Seva” may still be an acquisition action on Home; remove it from booked upcoming and completed cards.

## Progress and payment copy

Before the first target: “4 of 7 recommended weeks completed”. At the target: “7 week sankalp completed”. When the next configured target is 14: “You are continuing toward the recommended 14 week sankalp · 7 of 14 completed”. Use cadence appropriate units when a booking is not weekly. Do not imply a minimum term or reset the completed total.

Before confirmation, for a configured Friday example: “First Daan Seva ₹51 · Then ₹101 every Friday until cancelled in your UPI app”. Use the actual configured regular amount; ₹101, ₹121 and ₹151 are examples, not a fixed list of prices.

Parent billing: “Next AutoPay ₹101 on 16 November 2026”. The next seva date is a separate field. First occurrence bill: “Amount paid ₹51 · Introductory price”. Later occurrence bill: “Amount paid ₹101”. Display the actual charge for that date.

Retrying: “This week’s seva was discontinued because payment was unsuccessful. We will retry until {retry end date} for the next eligible seva.” For nonweekly cadences use “The seva on {date} was discontinued” instead of “this week”. Do not promise the missed seva will be performed late.

Inactive: “This Nirantar Daan Seva is inactive because payment could not be completed.” Cancelled: “AutoPay was cancelled in your UPI app.” Restart and cancellation guidance must match the real provider state.

## Beneficiary and evidence copy

Before first performance: “You can update these details before your first seva is performed. Changes apply to the first and future sevas.” After first performance: “Beneficiary details can no longer be edited because the first seva has been performed. Contact support to request a change for future sevas.” Actions: WhatsApp Support and Email Support.

Both preparing: “Your certificate and seva videos are being prepared. They will be available within 48 hours of completion.” Certificate ready: “Certificate ready”. Videos preparing: “Seva videos are being prepared and will be available within 48 hours of completion.” Ready videos: “2 videos ready”, using the real count.

If an expected asset is overdue: show a support action for that asset with the dated occurrence reference. Do not promise a new delivery deadline unless operations confirms one.

## Prepayment wording

Recommended replacement heading: “Review your Daan Seva”. Show the actual offering, beneficiary, gotra, date, first charge and regular charge before the confirmation action. Awaiting payment or pending confirmation needs its own neutral treatment. Reserve “Your Daan Seva is booked” for successful payment with confirmed registration.

The supplied “Delivered to temple” and “name and gotra have been sent” claims require an operational delivery event. If that event cannot be verified, use neutral review language instead. A success illustration or green check must reflect the same confirmed state as the text.

## Empty states

| Location | Message | Action |
| --- | --- | --- |
| No Nirantar bookings | You do not have an active Nirantar Daan Seva yet. | Explore Nirantar Sevas |
| No upcoming records | No Daan Sevas are currently scheduled. | Explore Sevas |
| No completed records | Your completed Daan Sevas will appear here with certificates and videos. | No primary action needed |

## Decisions needed before implementation

These decisions do not prevent preparing the required design variants. They must be resolved before engineering treats the relevant state transitions as final.

| Decision | Owner to confirm | Required resolution |
| --- | --- | --- |
| Final My Bookings layout | Product and design | Compare the five specified tasks using identical content and select A or B |
| Upcoming eligibility wording | Product and operations | Reconcile broad next eligible language with the detailed registered only rule; use Registered or Scheduled paid occurrences in Upcoming and awaiting payment information on the parent |
| Retry timing and next eligible date | Payments and operations | Exact attempt schedule, deadline timestamp, date cutoff, and the effect of crossing another cadence date within the 10 day window |
| Beneficiary lock event | Product, operations and engineering | Precise timestamp for first performance and consistency between app and fulfilment tooling |
| Payment and mandate synchronization | Payments and engineering | Source of Active, Inactive and Cancelled states, expected lag, and pending confirmation presentation |
| Payment confirmation and data delivery | Payments and operations | Events that permit “booked”, “sent” and “delivered” claims; handling of successful debit awaiting registration |
| Paid upcoming seva after cancellation | Payments and operations | What happens to an already paid upcoming occurrence when the mandate is cancelled; do not invent an automatic refund or cancellation rule |
| Evidence readiness and overdue handling | Operations and engineering | Independent callbacks or polling, per video state, 48 hour measurement, and support escalation |
| Monthly and lunar schedule or progress | Product and operations | Configured milestone units and targets, next date source and copy when the date is unconfirmed |
| Support destinations and availability | Operations | Real email, WhatsApp destination and hours; keep placeholders out of final screens |
| Content glossary and illustration variant | Content and design | Approved ritual and temple names; select one payment illustration style after state and pricing fixes |

## Recommended order of design work

First agree terminology and the representative fixture. Build reusable parent, upcoming and completed cards, then prototype both My Bookings layouts and evaluate them. Complete separate parent and occurrence details, then payment, beneficiary and evidence variants. Validate the open operational decisions and all acceptance criteria before final visual polish.
