"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Modal, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    id: "", // Assurez-vous d'inclure l'ID de l'utilisateur ici
    name: "",
    birthdate: "",
    lieu_naissance: "",
    pathologie: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setUserData({
      ...userData,
      birthdate: date || new Date(), // Sauvegarder la date sélectionnée ou une date par défaut
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Inclure l'ID de l'utilisateur dans les données envoyées
    const response = await fetch("/api/user", {
      method: "PUT", // Utiliser la méthode PUT pour la mise à jour
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userData.id, // Assurez-vous que l'ID est présent
        name: userData.name,
        birthdate: userData.birthdate,
        lieu_naissance: userData.lieu_naissance,
        pathologie: userData.pathologie,
      }),
    });

    if (response.ok) {
      router.refresh(); // Rafraîchir la page
      setShowModal(false); // Fermer le modal après mise à jour
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Avatar
        img="/path-to-default-photo.jpg"
        rounded={true}
        alt="User Profile"
        onClick={() => setShowModal(true)}
        className="cursor-pointer"
      />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Renseigner les informations</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Nom"
              name="name"
              onChange={handleChange}
              required
            />
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Date de Naissance
              </label>
              <DatePicker
                selected={userData.birthdate ? new Date(userData.birthdate) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="border p-2 w-full rounded-md"
              />
            </div>
            <TextInput
              type="text"
              placeholder="Lieu de Naissance"
              name="lieu_naissance"
              onChange={handleChange}
              required
            />
            <TextInput
              type="text"
              placeholder="Pathologie"
              name="pathologie"
              onChange={handleChange}
            />
            <Button type="submit">Enregistrer</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile;
