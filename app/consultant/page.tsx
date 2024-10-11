"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState([]);
  const [searchParams, setSearchParams] = useState({
    nom: '',
    specialite: '',
    ville: '',
  });

  const fetchConsultants = async () => {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`/api/consultants?${query}`);
    if (response.ok) {
      const data = await response.json();
      setConsultants(data);
    } else {
      console.error('Erreur lors de la récupération des consultants');
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des Consultants</h1>

      {/* Formulaire de recherche */}
      <div className="mb-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={searchParams.nom}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="specialite"
          placeholder="Spécialité"
          value={searchParams.specialite}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="ville"
          placeholder="Ville"
          value={searchParams.ville}
          onChange={handleInputChange}
          className="border p-2"
        />
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Spécialité</th>
            <th className="border border-gray-300 p-2">Ville</th>
            <th className="border border-gray-300 p-2">Code Postal</th>
            <th className="border border-gray-300 p-2">Adresse</th>
            <th className="border border-gray-300 p-2">Note</th>
            <th className="border border-gray-300 p-2">Année d'exercice</th>
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant) => (
            <tr key={consultant.id}>
              <td className="border border-gray-300 p-2">
                <Link href={`/consultant/${consultant.id}/planning`} className="text-blue-500 hover:underline">
                  {consultant.nom}
                </Link>
              </td>
              <td className="border border-gray-300 p-2">{consultant.specialite}</td>
              <td className="border border-gray-300 p-2">{consultant.ville}</td>
              <td className="border border-gray-300 p-2">{consultant.code_postal}</td>
              <td className="border border-gray-300 p-2">{consultant.adresse}</td>
              <td className="border border-gray-300 p-2">{consultant.note}</td>
              <td className="border border-gray-300 p-2">{consultant.annee_exercice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultantsList;
