import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Statement</h1>
            <p className="text-gray-600">Version 1.0</p>
            <p className="text-gray-600">Effective Date: May 24, 2022</p>
          </header>

          {/* Introduction */}
          <div className="prose prose-gray max-w-none space-y-6">
            <p className="text-gray-700">
              This Privacy Statement explains how Personal Information about our (potential) customers 
              and other individuals using our services is collected, used, and disclosed by Pluto and 
              its respective affiliates ("us," "we," "our," or "Pluto"). This Privacy Statement outlines 
              our privacy practices related to the use of our websites (including any customer portal or 
              interactive website, such as plutoai.co.in), applications, services, and related tools, 
              collectively referred to as the "Services."
            </p>

            {/* Information Collection Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Personal Information We Collect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">1.1 Information You Provide</h3>
                  <p className="text-gray-700 mb-3">We collect information you voluntarily provide, such as:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Name, email address, and contact details when creating an account.</li>
                    <li>Payment-related information through third-party payment processors (e.g., Stripe, Razorpay). 
                        Pluto does not store sensitive financial data.</li>
                    <li>Feedback, inquiries, and support requests submitted via our Services.</li>
                    <li>Optional profile details, such as photographs or social media links.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">1.2 Information Collected Automatically</h3>
                  <p className="text-gray-700 mb-3">When you interact with our Services, we may automatically collect:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Log Data: Information about device type, browser, IP address, usage time, pages visited, 
                        and referring URLs.</li>
                    <li>Cookies and Tracking Technologies: Data collected through cookies or similar technologies 
                        to improve performance and user experience.</li>
                    <li>Device Information: Details about your operating system, unique device identifiers, and 
                        usage data for debugging purposes.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Personal Information</h2>
              <p className="text-gray-700 mb-3">We use Personal Information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To deliver, maintain, and enhance our Services.</li>
                <li>To personalize experiences and provide customized content recommendations.</li>
                <li>To respond to inquiries, offer support, and address technical issues.</li>
                <li>To comply with legal obligations or enforce agreements.</li>
                <li>To send promotional or marketing communications if you opt in.</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-2">For questions about this Privacy Statement or our data practices, 
                please reach out:</p>
              <div className="space-y-1 text-gray-700">
                <p>Email: <a href="mailto:pluto.ai09@gmail.com" 
                  className="text-blue-600 hover:text-blue-800">pluto.ai09@gmail.com</a></p>
                <p>Address: Pluto HQ, HSR, Bangalore India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;