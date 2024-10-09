"use client"

import { Button, Datepicker, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

export default function UserDrawer(target: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Drawer" titleIcon={() => <></>} />
        <Drawer.Items>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="nom" className="mb-2 block">
                Nom
              </Label>
              <TextInput id="nom" name="nom" placeholder="Nom" />
            </div>
            <div className="mb-6">
              <Label htmlFor="prenom" className="mb-2 block">
                Prenom
              </Label>
              <TextInput id="prenom" name="prenom" placeholder="Prenom" />
            </div>
            <div className="mb-6">
              <Label htmlFor="birthdate" className="mb-2 block">
                Date Naissance
              </Label>
              <Datepicker id="birthdate" name="birthdate" maxDate={new Date()} weekStart={1} />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Enregistrer
              </Button>
            </div>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  )
};
