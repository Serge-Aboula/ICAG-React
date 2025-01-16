import React from 'react';
import ProjectCreationStep from '../ProjectCreationStep';
import { Card } from '@/components/ui/card';
import BackButton from '../common/BackButton';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaCheck as Check } from 'react-icons/fa';

const ProjectSetup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  //const formIsFilled = true; // Assuming you have a state variable to track form completion

  const handleContinue = async () => {
    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigate('/functional-requirements');
  };

  // const handleStart = () => {
        
  //   // Assuming you have a state variable to track form completion
  //   if (formIsFilled) {
  //     navigate('/functional-requirements'); // Redirection vers FunctionalRequirements
  //     setTimeout(() => navigate('/data-model'), 1000); // Redirection vers DataModel après 1 seconde
  //     setTimeout(() => navigate('/code-generation'), 2000); // Redirection vers CodeGeneration après 2 secondes
  //     setTimeout(() => navigate('/project-summary'), 3000); // Redirection vers ProjectSummary après 3 secondes
  //     setTimeout(() => navigate('/project-setup'), 4000); // Redirection vers ProjectSetup après 4 secondes
  //   }
  // };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-4xl mx-auto">
        <ProjectCreationStep />
      </Card>
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
        <BackButton />
        <Button
          onClick={handleContinue}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2"
          variant="default"
        >
          {isSubmitting ? (
            <>
              <span>Processing...</span>
              <Check className="animate-spin h-4 w-4" />
            </>
          ) : (
            'Continuer'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProjectSetup;