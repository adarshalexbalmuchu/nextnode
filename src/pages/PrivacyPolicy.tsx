import React from "react";

const PrivacyPolicy: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-2 text-sm text-gray-500">Last updated: May 24, 2025</p>
    <p className="mb-4">
      We value your privacy. This Privacy Policy explains how we collect, use,
      and protect your information when you use our blog platform.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>
        <b>Account Information:</b> When you register, we collect your name,
        email address, and password.
      </li>
      <li>
        <b>Usage Data:</b> We collect information about how you use the site,
        such as pages visited, bookmarks, comments, and reading history.
      </li>
      <li>
        <b>Cookies:</b> We use cookies to enhance your experience and for
        authentication.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">
      How We Use Your Information
    </h2>
    <ul className="list-disc ml-6 mb-4">
      <li>To provide and maintain our services</li>
      <li>To personalize your experience</li>
      <li>To communicate with you about your account or updates</li>
      <li>To improve our platform</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing</h2>
    <p className="mb-4">
      We do not sell or share your personal information with third parties
      except:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>As required by law</li>
      <li>To protect our rights</li>
      <li>
        With service providers who help us operate the platform (e.g., Supabase)
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
    <p className="mb-4">
      We use industry-standard security measures to protect your data. However,
      no method of transmission over the Internet is 100% secure.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>
        You can access, update, or delete your account information at any time
        from your dashboard.
      </li>
      <li>
        You may request deletion of your data by contacting support.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
    <p className="mb-4">
      We may update this Privacy Policy from time to time. Changes will be
      posted on this page.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPolicy;
