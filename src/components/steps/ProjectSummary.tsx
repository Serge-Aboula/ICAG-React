import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Download, Archive, Cloud, FileText, AlertCircle, Github, Terminal, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const ProjectSummary = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Simuler l'export du projet
  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    for(let i = 0; i <= 100; i += 10) {
      setExportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsExporting(false);
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const handleStart = async () => {
    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Résumé du projet et exportation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Résumé du projet */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Aperçu du projet</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Informations générales</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Nom du projet</dt>
                    <dd className="font-medium">Gestion des employés</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Type d'application</dt>
                    <dd className="font-medium">Application de gestion</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Technologies</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Frontend</dt>
                    <dd className="font-medium">React avec Bootstrap</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Backend</dt>
                    <dd className="font-medium">PHP Laravel</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistiques de génération */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="text-sm text-gray-500 mb-1">Entités</h4>
              <p className="text-2xl font-bold">4</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="text-sm text-gray-500 mb-1">Relations</h4>
              <p className="text-2xl font-bold">3</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="text-sm text-gray-500 mb-1">API Endpoints</h4>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="text-sm text-gray-500 mb-1">Vue</h4>
              <p className="text-2xl font-bold">8</p>
            </CardContent>
          </Card>
        </div>

        {/* Options de déploiement */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Options d'exportation</h3>
          <Tabs defaultValue="local">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="local" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Local
              </TabsTrigger>
              <TabsTrigger value="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Cloud
              </TabsTrigger>
            </TabsList>

            <TabsContent value="local" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Le code sera exporté dans un fichier ZIP avec la structure complète du projet.
                </AlertDescription>
              </Alert>
              
              {isExporting ? (
                <div className="space-y-2">
                  <Progress value={exportProgress} />
                  <p className="text-sm text-gray-500 text-center">{exportProgress}% - Export en cours...</p>
                </div>
              ) : (
                <Button
                  onClick={handleExport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exporter le projet
                </Button>
              )}
            </TabsContent>

            <TabsContent value="github" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Créez un nouveau dépôt GitHub et poussez le code automatiquement.
                </AlertDescription>
              </Alert>
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Connecter GitHub
              </Button>
            </TabsContent>

            <TabsContent value="cloud" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Déployez directement sur une plateforme cloud (Heroku, AWS, etc.).
                </AlertDescription>
              </Alert>
              <Button variant="outline" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Configurer le déploiement cloud
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Documentation et ressources */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Documentation et ressources</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentation technique
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              Guide de déploiement
            </Button>
          </div>
        </div>
        {/* Actions finales */}
        <div className="flex justify-between mt-6">
          <Button onClick={() => navigate('/code-generation')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à la génération de code
          </Button>
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
                'Finaliser le projet'
              )}
            </Button>
          </div>          
        </div>        
      </CardContent>
    </Card>
  );
};

export default ProjectSummary;