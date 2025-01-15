import Link from "next/link";
import { Button } from "@/components/ui/button"; // Importation du composant Button de Shadcn UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Composants Card de Shadcn UI
import { MapPinned } from "lucide-react";

const ActionItems: React.FC = () => {
    return (
        <div className="w-full pt-5 flex-1 p-5">
            <div className="max-w-[1300px] mx-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {/* Card 1 : Course */}
                <Card className="w-full shadow-sm rounded-lg flex flex-col">
                    <CardHeader> </CardHeader>
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        <div className="flex flex-col space-y-2 w-full md:w-3/5"> {/* Texte aligné à gauche */}
                            <CardTitle className="text-lg md:text-xl">Inscrivez-vous pour devenir chauffeur</CardTitle>
                            <p className="text-xs md:text-sm text-gray-700">
                                Travaillez selon vos propres horaires, recevez des commandes et intégrez une grande équipe internationale.
                            </p>
                            <Link href="/details">
                                <Button className="mt-4 bg-[#ff904e] text-xs md:text-base">Devenir chauffeur</Button> {/* Bouton Détails */}
                            </Link>
                        </div>
                        <div className="relative flex justify-center w-full md:w-2/5 mt-4 md:mt-0">
                            {/* Icône au-dessus de l&apos;image */}
                            <MapPinned className="absolute top-[-5px] sm:top-[-5px] left-1/2 transform -translate-x-1/2 text-[#ff904e] h-6 w-6 md:h-8 md:w-8"/>
                            <img src="https://i.ibb.co/cyvcpfF/uberx.png" alt="Uber car" className="h-20 md:h-24"/>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2 : Réserver */}
                <Card className="w-full shadow-sm rounded-lg flex flex-col">
                    <CardHeader> </CardHeader>
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        <div className="flex flex-col space-y-2 w-full md:w-3/5"> {/* Texte aligné à gauche */}
                            <CardTitle className="text-lg md:text-xl">Réserver une course (Compte passager)</CardTitle>
                            <p className="text-xs md:text-sm text-gray-700">
                                Réservez votre course à l&apos;avance pour pouvoir vous détendre le jour même.
                            </p>
                            <Link href="/details">
                                <Button className="mt-4 bg-[#ff904e] text-xs md:text-base">Compte passager</Button> {/* Bouton Détails */}
                            </Link>
                        </div>
                        <div className="relative flex justify-center w-full md:w-2/5 mt-4 md:mt-0">
                            <img
                                src="https://i.ibb.co/5RjchBg/uberschdule.png"
                                alt="Uber schedule"
                                className="h-20 md:h-24"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ActionItems;
