import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Trash2, Database, Link, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const DbSchema = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([
    {
      id: 1,
      name: '',
      attributes: [
        { id: 1, name: '', type: '', required: false }
      ]
    }
  ]);
  
  const [relations, setRelations] = useState<{ id: number; sourceEntity: string; targetEntity: string; type: string; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState('entities');

  const addEntity = () => {
    const newId = Math.max(...entities.map(e => e.id)) + 1;
    setEntities([...entities, {
      id: newId,
      name: '',
      attributes: [{ id: 1, name: '', type: '', required: false }]
    }]);
  };

  const addAttribute = (entityId: number) => {
    setEntities(entities.map(entity => {
      if (entity.id === entityId) {
        const newAttributeId = Math.max(...entity.attributes.map(a => a.id)) + 1;
        return {
          ...entity,
          attributes: [...entity.attributes, { id: newAttributeId, name: '', type: '', required: false }]
        };
      }
      return entity;
    }));
  };

  const addRelation = () => {
    const newId = relations.length > 0 ? Math.max(...relations.map(r => r.id)) + 1 : 1;
    setRelations([...relations, {
      id: newId,
      sourceEntity: '',
      targetEntity: '',
      type: '',
      name: ''
    }]);
  };

  const updateEntity = (entityId: number, field: string, value: string) => {
    setEntities(entities.map(entity =>
      entity.id === entityId ? { ...entity, [field]: value } : entity
    ));
  };

  const updateAttribute = (entityId: number, attributeId: number, field: string, value: string) => {
    setEntities(entities.map(entity => {
      if (entity.id === entityId) {
        return {
          ...entity,
          attributes: entity.attributes.map(attr =>
            attr.id === attributeId ? { ...attr, [field]: value } : attr
          )
        };
      }
      return entity;
    }));
  };

  const updateRelation = (relationId: number, field: string, value: string) => {
    setRelations(relations.map(relation =>
      relation.id === relationId ? { ...relation, [field]: value } : relation
    ));
  };
  const [isSubmitting, setIsSubmitting] = React.useState(false);
    
  const handleContinue = async () => {
    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigate('/code-generation');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Schéma de la base de données</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="entities" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="relations" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Relations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entities" className="space-y-6">
            {entities.map((entity) => (
              <Card key={entity.id}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Nom de la table
                      </label>
                      <Input
                        value={entity.name}
                        onChange={(e) => updateEntity(entity.id, 'name', e.target.value)}
                        placeholder="Ex: Employee"
                      />
                    </div>
                    {entities.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setEntities(entities.filter(e => e.id !== entity.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium">Attributs</label>
                    {entity.attributes.map((attribute) => (
                      <div key={attribute.id} className="flex items-center gap-2">
                        <Input
                          className="flex-1"
                          value={attribute.name}
                          onChange={(e) => updateAttribute(entity.id, attribute.id, 'name', e.target.value)}
                          placeholder="Nom de l'attribut"
                        />
                        <Select
                          value={attribute.type}
                          onValueChange={(value: string) => updateAttribute(entity.id, attribute.id, 'type', value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="integer">Integer</SelectItem>
                            <SelectItem value="float">Float</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newAttributes = entity.attributes.filter(a => a.id !== attribute.id);
                            setEntities(entities.map(e => e.id === entity.id ? { ...e, attributes: newAttributes } : e));
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addAttribute(entity.id)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un attribut
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={addEntity}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une entité
            </Button>
          </TabsContent>

          <TabsContent value="relations" className="space-y-4">
            {relations.map((relation) => (
              <Card key={relation.id}>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={relation.sourceEntity}
                      onValueChange={(value: string) => updateRelation(relation.id, 'sourceEntity', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Entité source" />
                      </SelectTrigger>
                      <SelectContent>
                        {entities.map(entity => (
                          <SelectItem key={entity.id} value={entity.name}>
                            {entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={relation.targetEntity}
                      onValueChange={(value: string) => updateRelation(relation.id, 'targetEntity', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Entité cible" />
                      </SelectTrigger>
                      <SelectContent>
                        {entities.map(entity => (
                          <SelectItem key={entity.id} value={entity.name}>
                            {entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Select
                    value={relation.type}
                    onValueChange={(value: string) => updateRelation(relation.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type de relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oneToOne">One to One</SelectItem>
                      <SelectItem value="oneToMany">One to Many</SelectItem>
                      <SelectItem value="manyToMany">Many to Many</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    value={relation.name}
                    onChange={(e) => updateRelation(relation.id, 'name', e.target.value)}
                    placeholder="Nom de la relation"
                  />
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={addRelation}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une relation
            </Button>
          </TabsContent>
        </Tabs>
        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button onClick={() => navigate('/functional-requirements')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux besoins fonctionnels
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

export default DbSchema;