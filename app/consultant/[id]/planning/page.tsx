"use client"; // Indique que ce composant fonctionne côté client
import { useEffect, useState } from 'react';
import RDV from '@/components/RDV';

export default function ConsultantPlanning({ params }: { params: { id: string } }) {
  const consultantId = Number(params.id);
  const [consultant, setConsultant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultantById = async () => {
      console.log("Fetching consultant with ID:", consultantId); // Log de l'ID
      if (isNaN(consultantId)) {
        console.error('ID de consultant non valide:', params.id);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/consultants/${consultantId}`);
        console.log("Response status:", response.status); // Log du statut de la réponse
        if (!response.ok) {
          throw new Error("Consultant non trouvé");
        }
        const data = await response.json();
        setConsultant(data);
        console.log("Consultant data:", data); // Log des données du consultant
      } catch (error) {
        console.error("Erreur lors de la récupération du consultant :", error);
      } finally {
        setLoading(false); // S'assurer que l'état de chargement est mis à jour
      }
    };

    fetchConsultantById();
  }, [consultantId, params.id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!consultant) {
    return <div>Consultant non trouvé</div>;
  }

  return (
    <div>
      <div className="profile-section flex items-center p-4 bg-blue-50 rounded-md my-4">
        <img
          src="https://via.placeholder.com/60"
          alt="Profile"
          className="mr-4 rounded-full"
        />
        <div>
          <div className="text-xl font-bold text-blue-900">
            {consultant.nom}, {consultant.ville} {consultant.code_postal}
          </div>
          <div className="text-lg text-gray-600">{consultant.specialite}</div>
        </div>
      </div>
      <RDV consultantId={consultant.id} />
    </div>
  );
}
