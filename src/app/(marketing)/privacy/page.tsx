import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/marketing/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data SaaSyToadCRM collects, why, and the choices you have over it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2, 2026"
      intro="What we collect, why we collect it, and the control you have. No dark patterns, no selling your data."
    >
      <LegalSection heading="Two kinds of data">
        <p>
          There's data about <strong>you</strong>, our customer (your name,
          email, billing details, and how you use the app), and there's the
          data <strong>you</strong> put into SaaSyToadCRM about your own
          contacts. We're the data controller for the first kind and the
          processor for the second. In plain terms: your customers' data belongs
          to you, and we only handle it to run the service for you.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          Account and contact details you give us, billing information, the
          content you create in the app, and basic technical and usage data
          (like log and device information) that helps us keep the product
          running and fix problems.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use it">
        <p>
          To provide the service, bill you, support you, keep the product
          secure, and make it better. We don't sell your data, and we don't sell
          the data you store about your contacts. That's not the business we're
          in.
        </p>
      </LegalSection>

      <LegalSection heading="Service providers we rely on">
        <p>
          We use a handful of trusted vendors to operate, for example cloud
          hosting, a managed database, and the payment, phone, and email
          providers you choose to connect. They only process data as needed to
          provide their piece, and only on our instructions.
        </p>
        {/* TODO(owner): publish the current sub-processor list (hosting,
            database, Stripe, Twilio, email, AI provider) and keep it updated. */}
      </LegalSection>

      <LegalSection heading="AI features">
        <p>
          Some features use AI to draft replies, answer calls, score leads, and
          handle follow-up. To do that, the relevant content is sent to our AI
          provider to generate a response. We don't allow your data to be used
          to train third-party models.
        </p>
        {/* TODO(owner): confirm the AI provider's data-use and no-training terms
            match this statement before launch. */}
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep your data while your account is active and for a reasonable
          period after, so you can come back or export it. When you ask us to
          delete it, we delete it, except where we're required to keep certain
          records (like billing) by law.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can access, correct, export, or delete your data. Depending on
          where you live, you may have additional rights under laws like GDPR or
          CCPA. To exercise any of them, email{" "}
          <a
            href="mailto:privacy@saasytoad.com"
            className="font-medium text-primary hover:underline"
          >
            privacy@saasytoad.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we change how we handle data in a meaningful way, we'll update this
          page and let you know. The &quot;last updated&quot; date at the top
          always reflects the current version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Privacy questions or requests go to{" "}
          <a
            href="mailto:privacy@saasytoad.com"
            className="font-medium text-primary hover:underline"
          >
            privacy@saasytoad.com
          </a>
          . [PLACEHOLDER: registered business address for formal notices.]
        </p>
      </LegalSection>
    </LegalPage>
  );
}
