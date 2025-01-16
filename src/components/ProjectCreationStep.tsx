import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
//import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ProjectCreationStep = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    context: '',
    applicationType: '',
    objective: '',
    targetAudience: '',
    constraints: '',
    frontend: '',
    backend: '',
    database: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {};
  //   if (!formData.projectName.trim()) {
  //     newErrors.projectName = 'Le nom du projet est requis';
  //   }
  //   if (!formData.context.trim()) {
  //     newErrors.context = 'Le contexte du projet est requis';
  //   }
  //   if (!formData.applicationType) {
  //     newErrors.applicationType = 'Le type d\'application est requis';
  //   }
  //   if (!formData.frontend) {
  //     newErrors.frontend = 'La technologie frontend est requise';
  //   }
  //   if (!formData.backend) {
  //     newErrors.backend = 'La technologie backend est requise';
  //   }
  //   if (!formData.database) {
  //     newErrors.database = 'La base de données est requise';
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Création d'un nouveau projet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informations de base */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom du projet</label>
            <Input
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              placeholder="Ex: Gestion des employés"
              className={errors.projectName ? 'border-red-500' : ''}
            />
            {errors.projectName && (
              <span className="text-red-500 text-sm">{errors.projectName}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contexte du projet</label>
            <Textarea
              value={formData.context}
              onChange={(e) => handleInputChange('context', e.target.value)}
              placeholder="Décrivez le contexte du projet"
              className={errors.context ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.context && (
              <span className="text-red-500 text-sm">{errors.context}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type d'application</label>
            <Select
              value={formData.applicationType}
              onValueChange={(value) => handleInputChange('applicationType', value)}
            >
              <SelectTrigger className={errors.applicationType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sélectionnez le type d'application" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="gestion">Application Web de Gestion</SelectItem>
                <SelectItem value="ecommerce">Site E-commerce</SelectItem>
                <SelectItem value="vitrine">Site Vitrine</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="cms">CMS</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            {errors.applicationType && (
              <span className="text-red-500 text-sm">{errors.applicationType}</span>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-4">
          <h3 className="font-medium">Technologies</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Frontend</label>
            <Select
              value={formData.frontend}
              onValueChange={(value) => handleInputChange('frontend', value)}
            >
              <SelectTrigger className={errors.frontend ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sélectionnez la technologie frontend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="php-bootstrap">Bootstrap</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="flutter">Flutter (Dart)</SelectItem>
                <SelectItem value="android">Android (Java)</SelectItem>
              </SelectContent>
            </Select>
            {errors.frontend && (
              <span className="text-red-500 text-sm">{errors.frontend}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Backend</label>
            <Select
              value={formData.backend}
              onValueChange={(value) => handleInputChange('backend', value)}
            >
              <SelectTrigger className={errors.backend ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sélectionnez la technologie backend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="spring">Java Spring Boot</SelectItem>
                <SelectItem value="django">Python Django</SelectItem>
                <SelectItem value="fastapi">Python FastAPI</SelectItem>
              </SelectContent>
            </Select>
            {errors.backend && (
              <span className="text-red-500 text-sm">{errors.backend}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Base de données</label>
            <Select
              value={formData.database}
              onValueChange={(value) => handleInputChange('database', value)}
            >
              <SelectTrigger className={errors.database ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sélectionnez la base de données" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="mysql">PostgreSQL</SelectItem>
                <SelectItem value="mysql">ORACLE</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
              </SelectContent>
            </Select>
            {errors.database && (
              <span className="text-red-500 text-sm">{errors.database}</span>
            )}
          </div>
        </div>

        {/* Alert d'information */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Les choix technologiques pourront être modifiés ultérieurement si nécessaire.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ProjectCreationStep;