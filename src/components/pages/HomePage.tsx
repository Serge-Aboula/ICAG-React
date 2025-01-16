import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleStart = async () => {
    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigate('/project-setup');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
              IT CORP' Applications Generator (ICAG)  
              </h1>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Projet de développement d'une application
                </h2>
                <p className="text-gray-500">
                  Commencez à donner les informations de base de votre projet.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleStart}
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
                    'Démarrer'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;