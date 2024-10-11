import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2">
      <Link href="/trees">
        <div className="flex flex-col items-center mt-5 cursor-pointer">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden transition-transform transform hover:scale-105">
            <img
              src="arbre.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 text-center text-blue-600">Créer/Suivre mon arbre</span>
        </div>
      </Link>
      <Link href="/consultant">
        <div className="flex flex-col items-center mt-5 cursor-pointer">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden transition-transform transform hover:scale-105">
            <img
              src="rdv.png" // Remplacez par votre image
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 text-center text-blue-600">Prendre un rendez-vous</span>
        </div>
      </Link>
    </main>
  );
}
