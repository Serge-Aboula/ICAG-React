import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Plus, Trash2, MessageSquare, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const FunctionalRequirementsStep = () => {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState([
    { id: 1, description: '', llmSuggestion: '', isProcessing: false }
  ]);
  const [activeRequirement, setActiveRequirement] = useState(1);

  const addRequirement = () => {
    const newId = Math.max(...requirements.map(r => r.id)) + 1;
    setRequirements([...requirements, {
      id: newId,
      description: '',
      llmSuggestion: '',
      isProcessing: false
    }]);
    setActiveRequirement(newId);
  };

  const removeRequirement = (id: number) => {
    if (requirements.length > 1) {
      const newRequirements = requirements.filter(r => r.id !== id);
      setRequirements(newRequirements);
      setActiveRequirement(newRequirements[0].id);
    }
  };

  const updateRequirement = (id: number, description: string) => {
    setRequirements(requirements.map(r => 
      r.id === id ? { ...r, description } : r
    ));
  };

  const getLLMSuggestion = async (id: number) => {
    // Simuler l'appel au LLM
    setRequirements(requirements.map(r => 
      r.id === id ? { ...r, isProcessing: true } : r
    ));

    await new Promise(resolve => setTimeout(resolve, 2000));

    setRequirements(requirements.map(r => 
      r.id === id ? {
        ...r,
        isProcessing: false,
        llmSuggestion: "Suggestion: Basé sur votre description, voici des fonctionnalités recommandées :\n\n" +
          "1. Interface de gestion des utilisateurs avec rôles\n" +
          "2. Tableau de bord pour visualiser les statistiques\n" +
          "3. Système de notifications par email\n" +
          "4. Export des données en PDF/Excel"
      } : r
    ));
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleContinue = async () => {
    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigate('/data-base');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Spécification des besoins fonctionnels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Navigation des besoins */}
        <div className="flex gap-2 flex-wrap">
          {requirements.map((req) => (
            <Button
              key={req.id}
              variant={activeRequirement === req.id ? "default" : "outline"}
              onClick={() => setActiveRequirement(req.id)}
              className="flex items-center gap-2"
            >
              Besoins {req.id}
              {requirements.length > 1 && (
                <Trash2 
                  className="h-4 w-4 text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRequirement(req.id);
                  }}
                />
              )}
            </Button>
          ))}
          <Button 
            variant="outline" 
            onClick={addRequirement}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        {/* Éditeur du besoin actif */}
        {requirements.map((req) => (
          <div 
            key={req.id}
            className={`space-y-4 ${activeRequirement === req.id ? '' : 'hidden'}`}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Description des besoins fonctionnels
              </label>
              <Textarea
                value={req.description}
                onChange={(e) => updateRequirement(req.id, e.target.value)}
                placeholder="Ex: Le système doit permettre aux utilisateurs de gérer les employés avec les opérations CRUD..."
                rows={4}
              />
            </div>

            {/* Bouton pour obtenir des suggestions */}
            <Button
              variant="outline"
              onClick={() => getLLMSuggestion(req.id)}
              disabled={req.isProcessing || !req.description.trim()}
              className="flex items-center gap-2"
            >
              {req.isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageSquare className="h-4 w-4" />
              )}
              Obtenir des suggestions
            </Button>

            {/* Affichage des suggestions */}
            {req.llmSuggestion && (
              <Alert className="mt-4">
                <AlertDescription className="whitespace-pre-wrap">
                  {req.llmSuggestion}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ))}
        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button onClick={() => navigate('/project-setup')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à la configuration du projet
          </Button>          
          <div className="flex justify-end">
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
      </CardContent>
    </Card>
  );
};

export default FunctionalRequirementsStep;