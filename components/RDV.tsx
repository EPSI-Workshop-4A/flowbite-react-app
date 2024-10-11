// app/consultants/[id]/planning/RDV.tsx

"use client"; // Indique que ce composant fonctionne côté client
import React, { useState } from "react";

// Fonction pour générer les créneaux horaires toutes les 30 minutes
function generateSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  let currentTime = new Date();
  currentTime.setHours(startHour, 0, 0, 0); // Commence à l'heure exacte

  const endTime = new Date();
  endTime.setHours(endHour, 0, 0, 0); // Termine à l'heure exacte

  while (currentTime <= endTime) {
    const hour = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    slots.push(`${hour}:${minutes}`);
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Incrémenter de 30 minutes
  }

  return slots;
}

// Configuration des horaires des consultants pour tous les jours
const consultantSchedule = {
  lundi: { slots: [...generateSlots(8, 12), ...generateSlots(14, 17)] },
  mardi: { slots: [...generateSlots(8, 12), ...generateSlots(14, 17)] },
  mercredi: { slots: [...generateSlots(9, 12), ...generateSlots(14, 17)] },
  jeudi: { slots: [...generateSlots(8, 12), ...generateSlots(14, 17)] },
  vendredi: { slots: [...generateSlots(8, 12), ...generateSlots(14, 17)] },
  samedi: { slots: [...generateSlots(8, 12)] }, // Samedi matin seulement
  dimanche: { slots: [] }, // Dimanche : fermé
};

export default function RDV({ consultantId }: { consultantId: number }) {
  // Initialisation de l'état des créneaux de rendez-vous (false = disponible, true = réservé)
  const initialSlots = Object.keys(consultantSchedule).reduce((acc, day) => {
    const daySchedule = consultantSchedule[day].slots;
    daySchedule.forEach((slot) => {
      acc[`${day}-${slot}`] = false; // Chaque créneau est initialement disponible
    });
    return acc;
  }, {} as Record<string, boolean>); // Ajout d'une annotation de type pour initialSlots

  const [slots, setSlots] = useState(initialSlots);

  // Fonction pour gérer la réservation d'un créneau
  const handleBooking = (slotId: string) => {
    if (!slots[slotId]) {
      const confirmRdv = window.confirm("Souhaitez-vous réserver ce créneau ?");
      if (confirmRdv) {
        setSlots((prevSlots) => ({
          ...prevSlots,
          [slotId]: true,
        }));
        alert("Votre rendez-vous a été réservé.");
      }
    } else {
      alert("Ce créneau est déjà réservé.");
    }
  };

  return (
    <main className="dark:bg-gray-800">
      <div className="mt-4 mx-auto container">
        <div className="header">
          <h1 className="text-center text-2xl font-bold text-white bg-sky-800 p-4">
            Prise de rendez-vous pour le consultant {consultantId}
          </h1>
        </div>

        {/* Tableau avec scroll */}
        <div className="table-wrapper max-h-64 overflow-y-scroll">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-sky-800 text-white">
                <th className="border p-2">Horaire</th>
                {Object.keys(consultantSchedule).map((day) => (
                  <th className="border p-2" key={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)} {/* Première lettre en majuscule */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Affiche les créneaux horaires */}
              {generateSlots(8, 12).concat(generateSlots(13, 17)).map((slot) => (
                <tr key={slot}>
                  <td className="border p-2 w-32">{slot}</td> {/* Colonne horaire */}
                  {Object.keys(consultantSchedule).map((day) => {
                    const slotKey = `${day}-${slot}`;
                    const isAvailable = slots[slotKey] !== undefined; // Vérifie la disponibilité
                    return (
                      <td
                        key={slotKey}
                        className={`border p-2 w-32 cursor-pointer ${
                          slots[slotKey]
                            ? "bg-gray-400" // Si réservé
                            : isAvailable
                            ? "bg-blue-50 hover:bg-blue-200" // Disponible et hover
                            : "bg-gray-300" // Pas disponible
                        }`}
                        onClick={() => {
                          // Appelle la fonction handleBooking uniquement si le créneau est disponible
                          if (isAvailable && !slots[slotKey]) {
                            handleBooking(slotKey);
                          }
                        }}
                      >
                        {slots[slotKey] ? "Réservé" : isAvailable ? "Disponible" : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
