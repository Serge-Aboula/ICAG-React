import { useLocation } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { path: '/project-setup', label: 'Configuration' },
  { path: '/functional-requirements', label: 'Exigences' },
  { path: '/data-base', label: 'Schéma BD' },
  { path: '/code-generation', label: 'Génération' },
  { path: '/project-summary', label: 'Résumé' },
];

const StepProgress = () => {
  const location = useLocation();
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-4 gap-4">
          {steps.map((step, index) => (
            <div key={step.path} className="flex items-center">
              <div className="flex flex-col items-center">
                {index <= currentStepIndex ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <Circle className="w-8 h-8 text-gray-300" />
                )}
                <span className="text-sm mt-1 font-medium text-gray-600">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-16 mx-2 ${
                    index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;