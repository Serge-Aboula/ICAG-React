import React, { createContext, useContext, useState } from 'react';

interface ProjectData {
  projectName: string;
  description: string;
  technologies: {
    frontend: string;
    backend: string;
    database: string;
  };
  requirements: string[];
  entities: any[];
}

interface ProjectContextType {
  projectData: ProjectData;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

const defaultProjectData: ProjectData = {
  projectName: '',
  description: '',
  technologies: {
    frontend: '',
    backend: '',
    database: '',
  },
  requirements: [],
  entities: [],
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectData, setProjectData] = useState<ProjectData>(defaultProjectData);

  const updateProjectData = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <ProjectContext.Provider value={{ projectData, updateProjectData }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};