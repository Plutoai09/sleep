import React from 'react';

const TnC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Terms of Service</h1>
            <p className="text-gray-600">Version 1.0</p>
            <p className="text-gray-600">Effective Date: May 24, 2022</p>
          </header>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-6">
              Welcome to Pluto, an expert-led, personalized, and interactive AI audiobook platform ("Pluto"). 
              These Terms of Service ("Agreement") are a legal agreement between Pluto and you, the individual 
              or entity accessing or using Pluto's services ("Customer" or "User"). By accessing or using our 
              platform, you agree to these terms.
            </p>

            {/* Definitions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Definitions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.1 "Authorized Devices"</h3>
                  <p className="text-gray-700">
                    Devices, such as smartphones, tablets, desktops, or other systems, authorized to access 
                    and interact with Pluto's platform and services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.2 "Content"</h3>
                  <p className="text-gray-700">
                    Includes, but is not limited to, audio recordings, text, graphics, feedback, files, and 
                    materials uploaded or created by the Customer within Pluto's platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.3 "Documentation"</h3>
                  <p className="text-gray-700">
                    User manuals, online help files, FAQs, or other materials that provide guidance on 
                    Pluto's features, usage, and best practices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.4 "Services"</h3>
                  <p className="text-gray-700">
                    Refers to all offerings provided by Pluto, including but not limited to AI-driven 
                    audiobook services, personalized learning features, expert-led lessons, and any 
                    accompanying applications or updates.
                  </p>
                </div>
              </div>
            </section>

            {/* License and Access Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. License and Access Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 License to Use Services</h3>
                  <p className="text-gray-700 mb-2">Pluto grants the Customer and authorized Users a limited, 
                    non-exclusive, non-transferable license to:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Use Pluto's Services for personal, professional, or internal business use.</li>
                    <li>Download and install Pluto's mobile or desktop applications for access.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 Account Creation and Security</h3>
                  <p className="text-gray-700">
                    To use Pluto's Services, Users must create an account with accurate, up-to-date information. 
                    Users are responsible for maintaining the confidentiality of their login credentials. 
                    Sharing or transferring accounts is strictly prohibited.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                For questions or concerns, please contact us at:{" "}
                <a href="mailto:plutoai.09@gmail.com" className="text-blue-600 hover:text-blue-800">
                  plutoai.09@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TnC;