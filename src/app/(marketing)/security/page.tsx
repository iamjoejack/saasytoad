import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/marketing/legal";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How SaaSyToadCRM protects your data: per-workspace isolation, encryption, 2FA, and a way to report issues.",
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      updated="June 2, 2026"
      intro="We hold your customers' data, so we treat it like it's ours. Here's how it's protected and how to reach us if you spot a problem."
    >
      <LegalSection heading="Where your data lives">
        <p>
          SaaSyToadCRM runs on managed cloud infrastructure (application hosting
          and a managed Postgres database). Traffic between you and the app is
          encrypted in transit over HTTPS/TLS.
        </p>
      </LegalSection>

      <LegalSection heading="Separation between clients">
        <p>
          Every workspace is isolated. Queries are scoped to a single workspace
          at the data layer, so one client's records can't bleed into another's.
          For agencies running many clients from one login, that boundary is
          enforced on the server for every read and write, not just hidden in
          the interface.
        </p>
      </LegalSection>

      <LegalSection heading="Secrets and encryption">
        <p>
          Sensitive credentials you connect (things like API keys for your
          phone, email, and payment providers) are encrypted at rest before
          they're stored. They're decrypted only when we need them to do the
          job you asked for.
        </p>
      </LegalSection>

      <LegalSection heading="Account protection">
        <p>
          Accounts support two-factor authentication. We recommend every user
          turn it on. Access inside a workspace is controlled by roles, so
          people only see what their role allows.
        </p>
      </LegalSection>

      <LegalSection heading="Reporting a vulnerability">
        <p>
          Found something? We want to hear about it. Email{" "}
          <a
            href="mailto:security@saasytoad.com"
            className="font-medium text-primary hover:underline"
          >
            security@saasytoad.com
          </a>{" "}
          with the details and how to reproduce it. We'll get back to you, and
          we won't come after researchers acting in good faith.
        </p>
      </LegalSection>

      <LegalSection heading="What we're still building">
        <p>
          We're a small team and we're honest about where we are. We're working
          toward formal third-party audits and certifications. We're not going
          to claim a badge we haven't earned. If a specific compliance
          requirement is a dealbreaker for you, ask us on a demo call and we'll
          tell you straight where it stands.
        </p>
        {/* TODO(owner): once you complete SOC 2 / ISO / HIPAA work (if ever),
            replace this section with the real certification status. Do not
            claim certifications that aren't in place. */}
      </LegalSection>
    </LegalPage>
  );
}
