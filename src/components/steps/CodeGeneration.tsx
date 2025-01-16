import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
//import { Alert, AlertDescription } from '@/components/ui/alert';
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Download, Code, RefreshCcw, Database, FileJson, FileCode, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const CodeGenerationStep = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  type GeneratedFileType = 'database' | 'api' | 'frontend' | 'documentation';
  const [activeTab, setActiveTab] = useState<GeneratedFileType>('database');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [generationOptions, setGenerationOptions] = useState({
    database: true,
    api: true,
    frontend: true,
    documentation: true
  });

  type GeneratedFile = {
    name: string;
    language: string;
    content: string;
  };

  const [generatedFiles, setGeneratedFiles] = useState<{
    database: GeneratedFile[];
    api: GeneratedFile[];
    frontend: GeneratedFile[];
    documentation: GeneratedFile[];
  }>({
    database: [],
    api: [],
    frontend: [],
    documentation: []
  });

  // Simulation de la génération de code
  const generateCode = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedFiles({
    database: [
      { name: 'schema.sql', language: 'sql', content: 'CREATE TABLE employees (\n  id INT PRIMARY KEY,\n  name VARCHAR(255)\n);' },
      { name: 'migrations.sql', language: 'sql', content: '-- Migration script content' }
    ],
    api: [
      { name: 'EmployeeController.php', language: 'php', content: '<?php\nclass EmployeeController {\n  public function index() {\n    // Code here\n  }\n}' },
      { name: 'DepartmentController.php', language: 'php', content: '<?php\nclass DepartmentController {\n}' }
    ],
    frontend: [
      { name: 'EmployeeList.js', language: 'javascript', content: 'export default function EmployeeList() {\n  return <div>Employee List</div>;\n}' },
      { name: 'EmployeeForm.js', language: 'javascript', content: 'export default function EmployeeForm() {\n}' }
    ],
    documentation: [
      { name: 'api-docs.md', language: 'markdown', content: '# API Documentation\n\n## Endpoints' },
      { name: 'schema.md', language: 'markdown', content: '# Database Schema' }
    ]
    });
    
    setIsGenerating(false);
  };

  const getFileList = () => {
    return generatedFiles[activeTab] || [];
  };

  const getActiveFile = () => {
    const files = getFileList();
    return files.find(f => f.name === selectedFile) || files[0] || null;
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleContinue = async () => {
    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigate('/project-summary');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Génération du code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Options de génération */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Options de génération</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(generationOptions).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium capitalize">{key}</label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked: boolean) => 
                    setGenerationOptions(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
          
          <Button 
            onClick={generateCode} 
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <Code className="h-4 w-4" />
            )}
            {isGenerating ? 'Génération en cours...' : 'Générer le code'}
          </Button>
        </div>
        
        {Object.keys(generatedFiles).some(key => generatedFiles[key as GeneratedFileType].length > 0) && (
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as GeneratedFileType)}>
              <TabsList className="grid grid-cols-4 gap-4">
                <TabsTrigger value="database" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Base de données
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  API
                </TabsTrigger>
                <TabsTrigger value="frontend" className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  Frontend
                </TabsTrigger>
                <TabsTrigger value="documentation" className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  Documentation
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="flex gap-4">
                  {/* Liste des fichiers */}
                  <div className="w-1/4 space-y-2">
                    {getFileList().map((file) => (
                      <Button
                        key={file.name}
                        variant={selectedFile === file.name ? "default" : "outline"}
                        className="w-full justify-start text-sm"
                        onClick={() => setSelectedFile(file.name)}
                      >
                        {file.name}
                      </Button>
                    ))}
                  </div>

                  {/* Prévisualisation du code */}
                  <div className="flex-1">
                    <pre className="p-4 rounded-lg bg-gray-100 overflow-x-auto">
                      <code>{getActiveFile()?.content || 'Sélectionnez un fichier'}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Options de téléchargement */}
            <div className="flex justify-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Télécharger le code généré
              </Button>
            </div>
          </div>
        )}
        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button onClick={() => navigate('/data-base')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour au schéma relationnel
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

export default CodeGenerationStep;