"use client"
import { useState } from 'react';
import { redirect } from 'next/navigation'; // Pour la redirection
import { Label, TextInput, Button } from 'flowbite-react';

const AddConsultant = () => {
  const [formData, setFormData] = useState({
    nom: '',
    specialite: '',
    ville: '',
    code_postal: '',
    adresse: '',
    note: '',
    description: '',
    annee_exercice: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/consultants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      redirect('/consultants'); // Redirection vers la page des consultants
    } else {
      console.error('Failed to add consultant');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ajouter un Consultant</h1>
      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire */}
        <div className="mb-4">
          <Label htmlFor="nom" value="Nom" />
          <TextInput id="nom" name="nom" type="text" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="specialite" value="Spécialité" />
          <TextInput id="specialite" name="specialite" type="text" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="ville" value="Ville" />
          <TextInput id="ville" name="ville" type="text" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="code_postal" value="Code Postal" />
          <TextInput id="code_postal" name="code_postal" type="text" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="adresse" value="Adresse" />
          <TextInput id="adresse" name="adresse" type="text" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="note" value="Note" />
          <TextInput id="note" name="note" type="number" step="0.1" min="0" max="5" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="description" value="Description" />
          <TextInput id="description" name="description" type="text" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="annee_exercice" value="Année d'exercice" />
          <TextInput id="annee_exercice" name="annee_exercice" type="number" required onChange={handleChange} />
        </div>
        <Button type="submit">Ajouter</Button>
      </form>
    </div>
  );
};

export default AddConsultant;
