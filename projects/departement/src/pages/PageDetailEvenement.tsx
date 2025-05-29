import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar as IconeCalendrier, 
  Clock, 
  Users, 
  MapPin, 
  Globe, 
  MessageSquare, 
  FileText, 
  Edit, 
  Trash, 
  ArrowLeft 
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Données factices pour les événements (simulation de données à récupérer depuis une API)
const evenements = [
  {
    id: "1",
    titre: "Réunion départementale",
    date: new Date(2025, 4, 15),
    heureDebut: "10:00",
    heureFin: "11:30",
    type: "reunion",
    lieu: "Salle de conférence A",
    modalite: "presentiel",
    lienVirtuel: "",
    participants: [
      { nom: "Prof. Diop", role: "Président", email: "diop@isi.sn" },
      { nom: "Prof. Seck", role: "Membre", email: "seck@isi.sn" },
      { nom: "Dr. Ndiaye", role: "Secrétaire", email: "ndiaye@isi.sn" }
    ],
    description: "Réunion mensuelle du département pour discuter des avancées pédagogiques et des projets en cours. L'ordre du jour comprend la préparation des examens, la mise à jour des syllabus et la planification des événements académiques à venir.",
    fichierAttache: "ordre-du-jour.pdf",
    organisateur: { nom: "Prof. Diop", email: "diop@isi.sn" }
  },
  {
    id: "2",
    titre: "Séminaire IA et données",
    date: new Date(2025, 4, 18),
    heureDebut: "09:00",
    heureFin: "12:00",
    type: "seminaire",
    lieu: "Zoom",
    modalite: "ligne",
    lienVirtuel: "https://zoom.us/j/123456789",
    participants: [
      { nom: "Prof. Diop", role: "Présentateur", email: "diop@isi.sn" },
      { nom: "Dr. Ndiaye", role: "Modérateur", email: "ndiaye@isi.sn" },
      { nom: "Étudiants M2", role: "Participants", email: "etudiants@isi.sn" }
    ],
    description: "Présentation des avancées récentes en IA et traitement des données massives. Les sujets abordés incluront l'apprentissage profond, le traitement du langage naturel et les applications dans divers secteurs industriels.",
    fichierAttache: "presentation.pptx",
    organisateur: { nom: "Dr. Ndiaye", email: "ndiaye@isi.sn" }
  },
  {
    id: "3",
    titre: "Soutenance - Ousmane Diallo",
    date: new Date(2025, 4, 16),
    heureDebut: "14:00",
    heureFin: "16:00",
    type: "soutenance",
    lieu: "Amphithéâtre B",
    modalite: "presentiel",
    lienVirtuel: "",
    participants: [
      { nom: "Prof. Mbaye", role: "Président du jury", email: "mbaye@isi.sn" },
      { nom: "Dr. Fall", role: "Examinateur", email: "fall@isi.sn" },
      { nom: "Dr. Sarr", role: "Encadreur", email: "sarr@isi.sn" },
      { nom: "Ousmane Diallo", role: "Étudiant", email: "diallo@isi.sn" }
    ],
    description: "Soutenance de mémoire sur l'Intelligence Artificielle appliquée à la détection de fraudes bancaires. Cette recherche propose une approche novatrice utilisant des algorithmes d'apprentissage automatique pour détecter les transactions frauduleuses en temps réel.",
    fichierAttache: "memoire-diallo.pdf",
    organisateur: { nom: "Dr. Sarr", email: "sarr@isi.sn" }
  },
  {
    id: "4",
    titre: "Session d'encadrement - Projet final",
    date: new Date(2025, 4, 17),
    heureDebut: "11:00",
    heureFin: "12:30",
    type: "encadrement",
    lieu: "Google Meet",
    modalite: "ligne",
    lienVirtuel: "https://meet.google.com/abc-defg-hij",
    participants: [
      { nom: "Prof. Diop", role: "Encadreur", email: "diop@isi.sn" },
      { nom: "Groupe d'étudiants B12", role: "Étudiants", email: "groupe-b12@isi.sn" }
    ],
    description: "Session de suivi et d'encadrement pour le projet final du groupe B12. Discussion des avancées, résolution des problèmes et planification des prochaines étapes.",
    fichierAttache: "rapport-progression.docx",
    organisateur: { nom: "Prof. Diop", email: "diop@isi.sn" }
  }
];

const PageDetailEvenement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const naviguer = useNavigate();
  const { toast } = useToast();
  
  // Récupérer l'événement en fonction de l'ID dans l'URL
  const evenement = evenements.find(e => e.id === id);
  
  if (!evenement) {
    return (
      <div className="container mx-auto py-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Événement non trouvé</CardTitle>
            <CardDescription>
              L'événement que vous essayez de consulter n'existe pas.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => naviguer("/calendrier")}>
              Retourner au calendrier
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const obtenirCouleurType = (type: string) => {
    switch(type) {
      case "reunion": return "bg-blue-100 text-blue-800";
      case "soutenance": return "bg-green-100 text-green-800";
      case "seminaire": return "bg-purple-100 text-purple-800";
      case "encadrement": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const obtenirLibelleType = (type: string) => {
    switch(type) {
      case "reunion": return "Réunion";
      case "soutenance": return "Soutenance";
      case "seminaire": return "Séminaire";
      case "encadrement": return "Encadrement";
      default: return type;
    }
  };
  
  const obtenirIconeType = (type: string) => {
    switch(type) {
      case "reunion": return <Users className="h-5 w-5" />;
      case "soutenance": return <FileText className="h-5 w-5" />;
      case "seminaire": return <MessageSquare className="h-5 w-5" />;
      case "encadrement": return <Users className="h-5 w-5" />;
      default: return <IconeCalendrier className="h-5 w-5" />;
    }
  };
  
  const gererSuppressionEvenement = () => {
    toast({
      title: "Événement supprimé",
      description: `L'événement "${evenement.titre}" a été supprimé.`,
    });
    naviguer("/calendrier");
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => naviguer(-1)}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold flex-1">{evenement.titre}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          {/* Carte d'informations principales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <IconeCalendrier className="mt-0.5 mr-3 h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-sm text-gray-600">
                    {format(evenement.date, 'EEEE d MMMM yyyy', { locale: fr })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="mt-0.5 mr-3 h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">Horaire</div>
                  <div className="text-sm text-gray-600">
                    {evenement.heureDebut} - {evenement.heureFin}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                {evenement.modalite === "presentiel" ? (
                  <MapPin className="mt-0.5 mr-3 h-5 w-5 text-gray-500" />
                ) : (
                  <Globe className="mt-0.5 mr-3 h-5 w-5 text-gray-500" />
                )}
                <div>
                  <div className="font-medium">
                    {evenement.modalite === "presentiel" ? "Lieu" : "Plateforme"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {evenement.lieu}
                    {evenement.modalite === "ligne" && evenement.lienVirtuel && (
                      <div className="mt-1">
                        <a 
                          href={evenement.lienVirtuel} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Rejoindre la réunion
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`mr-3 p-1 rounded-md ${obtenirCouleurType(evenement.type)}`}>
                  {obtenirIconeType(evenement.type)}
                </div>
                <div>
                  <div className="font-medium">Type</div>
                  <div className="text-sm text-gray-600">
                    {obtenirLibelleType(evenement.type)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="mt-0.5 mr-3 h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">Organisateur</div>
                  <div className="text-sm text-gray-600">
                    {evenement.organisateur.nom}
                    <div className="text-sm text-gray-500">
                      {evenement.organisateur.email}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to={`/calendrier/modifier/${evenement.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Link>
              </Button>
              <Button 
                variant="destructive"
                onClick={gererSuppressionEvenement}
              >
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </CardFooter>
          </Card>
          
          {/* Carte de fichier attaché */}
          {evenement.fichierAttache && (
            <Card>
              <CardHeader>
                <CardTitle>Fichier attaché</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 flex items-center">
                  <FileText className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <div className="font-medium">{evenement.fichierAttache}</div>
                    <div className="text-sm text-gray-500">
                      Document à consulter
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Télécharger
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* Description de l'événement */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">
                {evenement.description}
              </p>
            </CardContent>
          </Card>
          
          {/* Liste des participants */}
          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>
                {evenement.participants.length} personne(s) participante(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {evenement.participants.map((participant, index) => (
                  <li key={index} className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{participant.nom.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{participant.nom}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {participant.role}
                        </Badge>
                        {participant.email}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Envoyer une notification
              </Button>
            </CardFooter>
          </Card>
          
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link to={`/calendrier`}>
                  <IconeCalendrier className="mr-2 h-4 w-4" />
                  Voir le calendrier
                </Link>
              </Button>
              
              {evenement.type === "soutenance" && (
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Procès-verbal
                </Button>
              )}
              
              {evenement.type === "reunion" && (
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Compte-rendu
                </Button>
              )}
              
              {evenement.type === "encadrement" && (
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Note de suivi
                </Button>
              )}
              
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Gérer les participants
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageDetailEvenement;