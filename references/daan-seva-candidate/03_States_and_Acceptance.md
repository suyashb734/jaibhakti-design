# Daan Seva states and acceptance checks

Keep ongoing booking, dated fulfilment and evidence as independent state systems. A performed seva stays performed while its videos prepare; a discontinued date stays discontinued even when a later retry succeeds. The following matrices define the variants required for the design handoff.

## Ongoing booking states

| State | Required presentation | Action |
| --- | --- | --- |
| Active | AutoPay active; next actual amount and date if known; next eligible seva with registration state | View Details |
| Payment retrying | Affected date discontinued; exact retry end date if available; payment is for the next eligible seva | View Payment Details and support |
| Inactive | Retries ended unsuccessfully or mandate cannot be used; explain no ongoing registration | Restart Nirantar Seva |
| Cancelled | AutoPay cancelled through the UPI app; retain past history | Book This Seva Again and View Past Sevas |

Do not show pause or skip. Reaching a milestone does not change Active to Inactive or Cancelled. During provider synchronization keep the last known state visible and explain that it is updating.

## Dated occurrence states

| State | List placement | Detail behaviour |
| --- | --- | --- |
| Registered | Upcoming when it is the next dated Nirantar occurrence, or an upcoming one time booking | Payment succeeded and registration is confirmed; Track Seva Details |
| Scheduled | Same Upcoming rule | Show confirmed date and actual scheduling state; Track Seva Details |
| Performed | Completed; also parent history where applicable | Explicit performed timestamp; rating enabled; independent asset states |
| Discontinued | Parent history only for the affected Nirantar date | Explain payment failure; no performed evidence or progress increment |
| Projected date awaiting registration | Parent next eligible information only | Clearly awaiting payment or confirmation; never counted as a registered Upcoming record |

Projected is display context, not an additional approved occurrence status. Do not create synthetic booked records just to fill the date rail.

## Evidence combinations

| Certificate | Videos | Available experience |
| --- | --- | --- |
| Preparing | Preparing | View Seva Details; explain within 48 hours of performance |
| Ready | Preparing | View, download and share certificate immediately; videos retain their own preparation message |
| Preparing | Ready | Watch, download and share each video immediately; certificate retains its preparation message |
| Ready | Ready | Watch Videos and View Certificate; download and share inside viewers |
| Either asset overdue | Other asset can remain ready | Support for the overdue asset with occurrence reference; do not hide a ready asset |
| One ready asset fails to load | Other assets remain independent | Explain that load failure, offer retry or support and preserve other available controls |

Readiness and a playback, download or network error are distinct. A transient load failure must not rewrite a Ready asset to Preparing. Use per video states when several videos arrive or load separately; the source’s summary badge must not block ready videos.

## Payment transition checks

1. Successful scheduled charge registers the eligible dated occurrence, which then becomes visible in Upcoming.
2. Failed charge discontinues the affected date. The parent enters Payment retrying and shows the retry deadline when known.
3. A successful retry within the configured window registers the next eligible date. Keep the missed date discontinued; do not perform it late, move its certificate to another date or increment progress for it.
4. Retries stop after at most 10 days. Failure at expiry produces Inactive with a restart path. The exact retry cadence and cutoffs require payment team confirmation.
5. Cancellation received from the UPI provider produces Cancelled. Keep the last known state during delayed synchronization rather than briefly showing Active.
6. Restart preserves the selected seva and beneficiary for review and creates a new mandate when the old one cannot be used. It does not erase old occurrence history.

For a 10 day window overlapping another service date, the payment and operations teams must define which next eligible date a successful retry registers. The design must show that actual date once confirmed rather than invent a cut off.

## Specification acceptance coverage

The numbers below match the 22 acceptance criteria in the source specification. They are design checks for the next iteration, not assertions that the current supplied screens pass.

| Source criterion | Verification | Change groups |
| --- | --- | --- |
| 1 | Home, Profile and destination use My Bookings consistently | D01 |
| 2 | Chadhava removed from the booking experience | D02 D20 |
| 3 | Nirantar Daan Seva plus a separate supported cadence | D04 |
| 4 | Ongoing parent is distinguishable from each dated occurrence | D03 D11 D12 |
| 5 | Both IA layouts prototyped with identical records and states | D02 |
| 6 | Upcoming has only eligible Registered or Scheduled occurrences; no future projections | D08 |
| 7 | Every performed date retained with its own certificate and video states | D10 D11 |
| 8 | Name and gotra visible on every parent and occurrence card | D05 |
| 9 | Editable before first seva; locked afterwards; WhatsApp and email support | D15 |
| 10 | Configured recommended milestone advances without resetting cumulative total | D06 |
| 11 | Milestone completion neither stops AutoPay nor creates a milestone certificate | D06 D10 |
| 12 | Introductory and regular prices disclosed together; bills show actual charges | D07 D16 D18 |
| 13 | Failed charge discontinues the current date; retrying lasts up to 10 days | D14 |
| 14 | Successful retry registers next eligible date and never revives missed one | D08 D14 |
| 15 | Exhausted retries produce Inactive and restart or rebook path | D14 |
| 16 | No pause or skip controls | D11 D14 |
| 17 | No Start Seva action on upcoming or completed cards | D09 D10 |
| 18 | Upcoming action is Track Seva Details | D09 |
| 19 | Completed shows independent evidence readiness and 48 hour expectation | D10 D12 |
| 20 | In app video playback and per certificate or video download and share | D10 |
| 21 | Rating only after Performed | D13 |
| 22 | Text and semantics convey status; long names remain distinguishable | D05 D22 |

## Edge case review

- Same offering and temple booked for two beneficiaries; same beneficiary name with different gotras; identical names and gotras distinguished by references.
- Before first performance editing, the lock boundary, support request afterwards and preservation of historical bills and certificates.
- Progress at zero, one below target, at target, next target with preserved count and no next target configured. Use appropriate units for monthly and lunar cadences.
- Nearest upcoming date already paid versus next eligible date not yet paid; payment retry across another cadence date; retry success and expiry.
- Independent or simultaneous certificate and video readiness; several videos; one failed video; expired or failed download; cancelled system share action without a false success message.
- Evidence overdue beyond 48 hours; support includes the relevant occurrence reference.
- No parents, no upcoming records, no completed records, long history and pagination or View all restoration.
- Unknown next lunar date, operational date change, delayed UPI callback and stale network data.
- Keyboard and safe area access in the adjacent details flow, long text, text enlargement, focus order and noncolour status identification.

## Engineering handoff data

Keep stable parent and occurrence identifiers, source type, cadence, actual scheduled and performed timestamps, next eligible date and registration state, actual billed amount, first and regular prices, next debit amount and date, retry deadline, beneficiary name and gotra, and editability or lock timestamp.

Certificate and each video need independent readiness, asset identity, links, and ready timestamps. Videos also need order, title or accessible label, thumbnail and duration when available. Support needs configured destinations, availability and the relevant reference. Product events should distinguish viewing a parent, tracking a date, asset actions and payment recovery; do not put beneficiary personal data in event names.
