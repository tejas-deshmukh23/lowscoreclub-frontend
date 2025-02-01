import React from 'react';

const ProgressSteps = ({ steps, currentStep = 0 }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative flex justify-between items-center">
        {/* Container for lines */}
        <div className="absolute inset-0 flex items-center">
          {/* Background line */}
          <div className="w-full h-[2px] bg-gray-200" />
          
          {/* Progress line */}
          <div 
            className="absolute h-[2px] bg-blue-500 transition-all duration-300"
            style={{ 
              left: 0,
              width: `${(currentStep / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
        
        {/* Steps */}
        <div className="relative z-10 flex justify-between w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center" style={{paddingLeft:"10%", paddingRight:"10%"}}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 
                  ${index <= currentStep 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'bg-white border-gray-300'
                  } relative`}
              >
                <span style={{fontSize:"30px", paddingLeft:"50%", paddingRight:"50%"}} className={index <= currentStep ? 'text-white' : 'text-gray-500'}>
                  {step.icon}
                </span>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example usage component
const ProgressExample = () => {
  const steps = [
    { label: 'Ask a question', icon: '📝' },
    { label: 'Post publicly', icon: '🚀' },
    { label: 'Receive feedback', icon: '👥' }
  ];

  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <div>
      <ProgressSteps steps={steps} currentStep={currentStep} />
      
    </div>
  );
};

export default ProgressExample;