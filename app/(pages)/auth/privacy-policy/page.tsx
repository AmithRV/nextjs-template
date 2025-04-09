"use client";
import React, { useState } from "react";

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    {
      id: "collection",
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, fill out a form, or communicate with us. The types of information we may collect include your name, email address, postal address, phone number, and other contact or identifying information you choose to provide.",
    },
    {
      id: "use",
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, protect our company and users, and comply with law. We may also use your information to personalize content and provide advertisements.",
    },
    {
      id: "sharing",
      title: "Sharing Your Information",
      content:
        "We may share your information with vendors, service providers, and consultants that need access to your information to perform services for us. We may also share information if we believe it is necessary to comply with law, to protect rights and safety, or in connection with a merger, sale of company assets, financing, or acquisition.",
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.",
    },
    {
      id: "rights",
      title: "Your Data Protection Rights",
      content:
        "Depending on your location, you may have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise these rights, please contact us. In certain circumstances, you can object to processing of your personal information, ask us to restrict processing, or request portability.",
    },
    {
      id: "retention",
      title: "Data Retention",
      content:
        "We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it. We may retain certain information for legitimate business purposes or as required by law.",
    },
    {
      id: "security",
      title: "Security",
      content:
        "We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the security of our systems.",
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      content:
        'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
    },
    {
      id: "contact",
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@example.com or at our mailing address: 123 Privacy Street, Anytown, USA 12345.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-600">
            Last Updated: April 9, 2025
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-700 mb-6">
                This Privacy Policy describes how we collect, use, and share
                your personal information when you use our website, products,
                and services.
              </p>

              <div className="space-y-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none"
                      onClick={() => toggleSection(section.id)}
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        {section.title}
                      </h3>
                      <svg
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          activeSection === section.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {activeSection === section.id && (
                      <div className="px-4 py-3 border-t border-gray-200">
                        <p className="text-gray-700">{section.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
