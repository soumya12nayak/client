const ApplicationTimeline = ({ status }) => {
    const steps = ['Applied', 'Pending', 'Accepted', 'Rejected'];
    const currentStep = steps.indexOf(status.replace("✅ ", "").replace("❌ ", ""));
  
    return (
      <div className="flex items-center gap-2 mt-2 text-sm">
        {steps.map((step, index) => (
          <div key={index} className={`flex items-center gap-1`}>
            <span className={`w-3 h-3 rounded-full ${
              index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className={`${index === currentStep ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
              {step}
            </span>
            {index < steps.length - 1 && <span className="text-gray-400">➜</span>}
          </div>
        ))}
      </div>
    );
  };
  
  export default ApplicationTimeline;
  