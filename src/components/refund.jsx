import React from 'react';

const Refund = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="space-y-6">
            {/* Main Policy */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                At Pluto, we offer a <span className="font-semibold">24-hour no-questions-asked refund policy</span> for 
                all customers. You can request a full refund within 24 hours of your purchase without providing a reason.
              </p>
            </div>

            {/* Additional Terms */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Additional Terms</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  Refund requests made after the <span className="font-semibold">24-hour period</span> will 
                  not be processed.
                </li>
                <li>
                  Canceling your subscription does not automatically qualify for a refund for any unused 
                  portion of your term.
                </li>
              </ul>
            </div>

            {/* Downgrades and Credits */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Downgrades and Credits</h2>
              <p className="text-gray-700 leading-relaxed">
                If you choose to downgrade your plan during an active term, any unused amount will be 
                credited to your Pluto account and can be applied to future purchases.
              </p>
            </div>

            {/* Billing and Support */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Billing and Support</h2>
              <p className="text-gray-700 leading-relaxed">
                Our payment processing is managed by <span className="font-semibold">Razorpay</span>. 
                For any billing or refund inquiries, please contact our 
                <span className="font-semibold"> Account Support team</span> via our Contact Page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;