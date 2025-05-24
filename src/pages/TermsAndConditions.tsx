import React from "react";

const TermsAndConditions: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
    <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
    <p className="mb-2 text-sm text-gray-500">Last updated: May 24, 2025</p>
    <p className="mb-4">
      Welcome to our blog platform. By accessing or using our site, you agree to
      these Terms and Conditions.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Use of the Platform</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You must be at least 13 years old to use this site.</li>
      <li>
        You are responsible for maintaining the confidentiality of your account.
      </li>
      <li>You agree not to use the platform for unlawful or abusive purposes.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">User Content</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You retain ownership of your posts, comments, and other content.</li>
      <li>
        By posting content, you grant us a license to display and distribute it
        on our platform.
      </li>
      <li>
        We reserve the right to remove content that violates our policies or the
        law.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Account Termination</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>We may suspend or terminate your account if you violate these terms.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>We are not liable for any damages resulting from your use of the platform.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
    <p className="mb-4">
      We may update these Terms and Conditions from time to time. Changes will
      be posted on this page.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
    <p>
      If you have any questions about these Terms and Conditions, please
      contact us at{" "}
      <a
        href="mailto:support@example.com"
        className="text-teal-500 underline"
      >
        support@example.com
      </a>
      .
    </p>
  </div>
);

export default TermsAndConditions;
