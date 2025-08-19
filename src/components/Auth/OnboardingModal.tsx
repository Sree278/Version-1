import React, { useState } from 'react';

const steps = [
  'Complete your profile',
  'Create your first invoice',
  'Upload payment proof',
  'Explore analytics',
];

const OnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Earth Mover SaaS!</h2>
        <p className="mb-6 text-gray-600">Let's get you started. Follow these steps to onboard quickly:</p>
        <div className="w-full mb-6">
          <div className="flex flex-col space-y-2">
            {steps.map((s, idx) => (
              <div key={s} className={`px-4 py-2 rounded ${idx === step ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'bg-gray-100 text-gray-500'}`}>{idx + 1}. {s}</div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            className="btn btn-secondary"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >Previous</button>
          {!isLast ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button>
          ) : (
            <button className="btn btn-success" onClick={onClose}>Finish</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
