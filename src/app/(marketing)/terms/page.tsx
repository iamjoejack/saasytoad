import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/marketing/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The plain-English terms for using SaaSyToadCRM.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 2, 2026"
      intro="Plain-English terms for using SaaSyToadCRM. Using the product means you agree to them. Questions? Email saasytoad@gmail.com."
    >
      <LegalSection heading="Who we are">
        <p>
          SaaSyToadCRM is a product of SaaSyToad ([PLACEHOLDER: full legal entity
          name and registered address]). In these terms, &quot;we&quot; and
          &quot;us&quot; mean SaaSyToad, and &quot;you&quot; means the person or
          business using the product.
        </p>
      </LegalSection>

      <LegalSection heading="Your account">
        <p>
          You're responsible for what happens under your account, for keeping
          your login secure, and for making sure the people you invite follow
          these terms. Turn on two-factor authentication. Don't share one login
          across people who should have their own.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Use SaaSyToadCRM for honest business. Don't use it to send spam, break
          messaging or email laws, harass people, or do anything illegal. When
          you send texts or emails through the product, you're responsible for
          having permission to contact those people and for honoring opt-outs.
        </p>
      </LegalSection>

      <LegalSection heading="Billing">
        <p>
          Paid plans are billed monthly or annually at the price for your tier.
          The price you signed up at is the price we charge. We'll give you
          notice before any change. If you connect your own third-party
          providers (for example a phone or email service), you pay those
          providers directly at their rates.
        </p>
      </LegalSection>

      <LegalSection heading="Your data is yours">
        <p>
          You own the data you put into SaaSyToadCRM. We use it to run the
          service for you, and you can export it. If you cancel, you can take
          your data with you. How we handle personal data is covered in our
          Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellation">
        <p>
          You can cancel any time. Monthly plans stop at the end of the current
          period. We don't trap you with surprise renewals or hard-to-find
          cancel buttons.
        </p>
      </LegalSection>

      <LegalSection heading="The honest disclaimer part">
        <p>
          We work hard to keep the product running and accurate, but it's
          provided &quot;as is.&quot; To the extent the law allows, we're not
          liable for indirect or consequential damages, and our total liability
          is limited to what you paid us in the prior 12 months. Nothing here
          takes away rights you have that can't be waived.
        </p>
        {/* TODO(owner / legal): counsel should confirm the liability cap,
            warranty disclaimer, and indemnity language for your jurisdiction. */}
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of [PLACEHOLDER: governing-law
          state/country], without regard to conflict-of-laws rules.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms as the product grows. If we make a material
          change, we'll let you know. Continuing to use the product after a
          change means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a
            href="mailto:saasytoad@gmail.com"
            className="font-medium text-primary hover:underline"
          >
            saasytoad@gmail.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
