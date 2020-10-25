import React, { createContext, useContext, useState } from 'react';

interface CreateOrphanageContextData {
  states: CreateOrphanageContextStates;
  setStates: (states: CreateOrphanageContextStates) => void;
  setPosition: (position: { latitude: number; longitude: number }) => void;
}

interface CreateOrphanageContextStates {
  name: string;
  about: string;
  position: {
    latitude: number;
    longitude: number;
  };
  images: string[];
}

const CreateOrphanageContext = createContext<CreateOrphanageContextData>(
  {} as CreateOrphanageContextData
);

const CreateOrphanageProvider: React.FC = ({ children }) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function setStates({ name, about, images }: CreateOrphanageContextStates) {
    setName(name);
    setAbout(about);
    setImages(images);
  }

  return (
    <CreateOrphanageContext.Provider
      value={{
        states: { position, name, about, images },
        setStates,
        setPosition,
      }}
    >
      {children}
    </CreateOrphanageContext.Provider>
  );
};

export default CreateOrphanageProvider;

export function useCreateOrphanage(): CreateOrphanageContextData {
  const context = useContext(CreateOrphanageContext);

  if (!context)
    throw new Error(
      'useCreateOrphanage must be used within an CreateOrphanageProvider'
    );

  return context;
}
