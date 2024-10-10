"use client"
import { useEffect, useState } from 'react';

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    const fetchConsultants = async () => {
      const response = await fetch('/api/consultants');
      if (response.ok) {
        const data = await response.json();
        setConsultants(data);
      } else {
        console.error('Erreur lors de la récupération des consultants');
      }
    };

    fetchConsultants();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des Consultants</h1>
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
              <td className="border border-gray-300 p-2">{consultant.nom}</td>
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
