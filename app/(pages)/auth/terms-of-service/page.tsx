"use client";
import React, { useState } from "react";

function TermsOfService() {
  const [isOpen, setIsOpen] = useState(Array(6).fill(false));

  const toggleAccordion = (index: number) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: April 9, 2025
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Welcome to Our Service
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Please read these Terms of Service carefully before using our
              application. By accessing or using our service, you agree to be
              bound by these terms.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Section 1 */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(0)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                1. Acceptance of Terms
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  isOpen[0] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen[0] && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-gray-500">
                  By accessing or using our services, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms of
                  Service. If you do not agree to these terms, please do not use
                  our services. We reserve the right to modify these terms at
                  any time, and such modifications shall be effective
                  immediately upon posting. Your continued use of our services
                  following any modification constitutes your acceptance of the
                  modified terms.
                </p>
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(1)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                2. User Accounts
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  isOpen[1] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen[1] && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-gray-500">
                  To use certain features of our service, you may be required to
                  create an account. You are responsible for maintaining the
                  confidentiality of your account information, including your
                  password, and for all activity that occurs under your account.
                  You agree to notify us immediately of any unauthorized use of
                  your account. We reserve the right to disable any user account
                  at any time if we believe you have violated these terms.
                </p>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(2)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                3. User Content
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  isOpen[2] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen[2] && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-gray-500">
                  You retain all ownership rights to the content you submit to
                  our service. By submitting content, you grant us a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, modify,
                  adapt, publish, translate, create derivative works from,
                  distribute, and display such content. You represent and
                  warrant that you own or have the necessary rights to use and
                  authorize us to use all intellectual property rights in and to
                  any content you submit.
                </p>
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(3)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                4. Prohibited Activities
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  isOpen[3] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen[3] && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-gray-500">
                  You agree not to engage in any of the following prohibited
                  activities: (1) copying, distributing, or disclosing any part
                  of our service; (2) using any automated system to access our
                  service; (3) attempting to interfere with or compromise the
                  system integrity or security; (4) submitting false or
                  misleading information; (5) uploading invalid data, viruses,
                  or other harmful code; (6) impersonating another person or
                  entity; or (7) using our service for any illegal or
                  unauthorized purpose.
                </p>
              </div>
            )}
          </div>

          {/* Section 5 */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(4)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                5. Disclaimers and Limitations
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  isOpen[4] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen[4] && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-gray-500">
                  Our service is provided "as is" without warranties of any
                  kind, either express or implied. We do not warrant that our
                  service will be uninterrupted or error-free. In no event shall
                  we be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses, resulting from your access to or use of or
                  inability to access or use our service.
                </p>
              </div>
            )}
          </div>

          {/* Section 6 */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(5)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                6. Governing Law
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  isOpen[5] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen[5] && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-gray-500">
                  These Terms of Service shall be governed by and construed in
                  accordance with the laws of the United States, without regard
                  to its conflict of law principles. Any dispute arising from
                  these terms shall be resolved exclusively in the courts
                  located within the applicable jurisdiction.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
