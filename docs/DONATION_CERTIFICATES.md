# Donation acknowledgement certificates

## What donors experience

1. A donor contributes using the published UPI QR code or bank-transfer details.
2. On `/support`, they submit their name, contact email, amount, payment method and transaction reference.
3. The site confirms that the details were received for review. It does **not** issue a certificate at this point.

## What the BSGSS team does

1. An `admin` or `super_admin` opens `/admin/donations`.
2. They compare the submitted reference with the BSGSS bank/UPI records.
3. Only after that check, they select **Verify & issue**.
4. The system creates a unique certificate number, records the issuing administrator in the audit log and provides a printable certificate URL.

The certificate intentionally says *Donation acknowledgement*, not tax receipt or tax-exemption certificate. Add a separate statutory receipt process only after BSGSS confirms the required legal wording and compliance process.

## Activation

The workflow requires the `donation_requests` table in `lib/db/schema.sql`. After deploying the code with a valid `DATABASE_URL`, run this once from the deployment environment:

```bash
npm run db:init
```

The schema is idempotent: it creates the donation table, its index and the `updated_at` trigger if they do not already exist. Do not accept verification submissions until this command has completed successfully.

## Email delivery

The first version provides a secure, printable certificate page for a verified request. It does not send email automatically. When BSGSS chooses an email provider, send the certificate link only after the administrator has verified the payment.
