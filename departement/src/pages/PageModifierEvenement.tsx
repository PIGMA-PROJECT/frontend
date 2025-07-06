import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Clock, GlobeIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

// Schéma de validation avec Zod
const schemaFormulaire = z.object({
  titre: z.string().min(3, { message: "Le titre doit comporter au moins 3 caractères" }),
  typeEvenement: z.enum(["reunion", "soutenance", "seminaire", "encadrement"], {
    required_error: "Veuillez sélectionner un type d'événement",
  }),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  heureDebut: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Format d'heure invalide (HH:MM)",
  }),
  heureFin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Format d'heure invalide (HH:MM)",
  }),
  modalite: z.enum(["presentiel", "ligne"], {
    required_error: "Veuillez sélectionner une modalité",
  }),
  lieu: z.string().min(2, { message: "Veuillez indiquer un lieu" }),
  lienVirtuel: z.string().optional(),
  participants: z.string().min(3, { message: "Veuillez indiquer au moins un participant" }),
  description: z.string().optional(),
}).refine((data) => {
  // Si en ligne, le lien virtuel est obligatoire
  if (data.modalite === "ligne" && (!data.lienVirtuel || data.lienVirtuel.length < 5)) {
    return false;
  }
  return true;
}, {
  message: "Pour un événement en ligne, veuillez fournir un lien de connexion valide",
  path: ["lienVirtuel"],
});

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
    participants: "Prof. Diop, Prof. Seck, Dr. Ndiaye",
    description: "Réunion mensuelle du département pour discuter des avancées pédagogiques et des projets en cours."
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
    participants: "Prof. Diop, Dr. Ndiaye, Étudiants M2",
    description: "Présentation des avancées récentes en IA et traitement des données massives."
  }
];

const PageModifierEvenement: React.FC = () => {
  const { toast } = useToast();
  const naviguer = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Récupérer l'événement à modifier en fonction de l'ID dans l'URL
  const evenement = evenements.find(e => e.id === id);
  
  const formulaire = useForm<z.infer<typeof schemaFormulaire>>({
    resolver: zodResolver(schemaFormulaire),
    // Valeurs par défaut basées sur l'événement existant
    defaultValues: evenement ? {
      titre: evenement.titre,
      typeEvenement: evenement.type as any,
      date: evenement.date,
      heureDebut: evenement.heureDebut,
      heureFin: evenement.heureFin,
      modalite: evenement.modalite as any,
      lieu: evenement.lieu,
      lienVirtuel: evenement.lienVirtuel,
      participants: evenement.participants,
      description: evenement.description,
    } : {
      titre: "",
      typeEvenement: undefined,
      date: undefined,
      heureDebut: "",
      heureFin: "",
      modalite: undefined,
      lieu: "",
      lienVirtuel: "",
      participants: "",
      description: "",
    },
  });

  // Observer les changements de modalité pour afficher/masquer le champ de lien virtuel
  const modaliteSelectionnee = formulaire.watch("modalite");

  function onSubmit(valeurs: z.infer<typeof schemaFormulaire>) {
    console.log(valeurs);
    
    // Simuler la modification d'un événement (à remplacer par l'appel API réel)
    setTimeout(() => {
      toast({
        title: "Événement modifié",
        description: `L'événement "${valeurs.titre}" a été mis à jour.`,
      });
      naviguer("/calendrier");
    }, 1000);
  }

  // Si l'événement n'est pas trouvé
  if (!evenement) {
    return (
      <div className="container mx-auto py-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Événement non trouvé</CardTitle>
            <CardDescription>
              L'événement que vous essayez de modifier n'existe pas.
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

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Modifier un événement</h1>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Modification de l'événement</CardTitle>
          <CardDescription>
            Modifiez les détails de l'événement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formulaire}>
            <form onSubmit={formulaire.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Titre de l'événement */}
                <FormField
                  control={formulaire.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Titre de l'événement*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Réunion du département informatique" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type d'événement */}
                <FormField
                  control={formulaire.control}
                  name="typeEvenement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'événement*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reunion">Réunion</SelectItem>
                          <SelectItem value="soutenance">Soutenance</SelectItem>
                          <SelectItem value="seminaire">Séminaire</SelectItem>
                          <SelectItem value="encadrement">Session d'encadrement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Le type détermine la catégorie de l'événement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={formulaire.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: fr })
                              ) : (
                                <span>Sélectionnez une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Heures de début et fin */}
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={formulaire.control}
                    name="heureDebut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de début*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="HH:MM" {...field} />
                            <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formulaire.control}
                    name="heureFin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de fin*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="HH:MM" {...field} />
                            <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Modalité (présentiel/en ligne) */}
                <FormField
                  control={formulaire.control}
                  name="modalite"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Modalité*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="presentiel" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <MapPinIcon className="mr-1 h-4 w-4 text-gray-500" />
                              Présentiel
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ligne" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <GlobeIcon className="mr-1 h-4 w-4 text-gray-500" />
                              En ligne
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Lieu */}
                <FormField
                  control={formulaire.control}
                  name="lieu"
                  render={({ field }) => (
                    <FormItem className={modaliteSelectionnee === "ligne" ? "md:col-span-1" : "md:col-span-2"}>
                      <FormLabel>Lieu*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={
                            modaliteSelectionnee === "presentiel" 
                              ? "Ex: Salle de conférence A" 
                              : "Ex: Zoom, Google Meet, etc."
                          } 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Lien virtuel (conditionnel) */}
                {modaliteSelectionnee === "ligne" && (
                  <FormField
                    control={formulaire.control}
                    name="lienVirtuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lien de connexion*</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: https://zoom.us/j/123456789" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Participants */}
                <FormField
                  control={formulaire.control}
                  name="participants"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Participants*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Prof. Diop, Dr. Ndiaye, Étudiants M2" {...field} />
                      </FormControl>
                      <FormDescription>
                        Séparez les noms par des virgules
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={formulaire.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ajoutez des détails sur l'événement..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => naviguer("/calendrier")}
                >
                  Annuler
                </Button>
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={() => {
                    toast({
                      title: "Événement supprimé",
                      description: `L'événement "${evenement.titre}" a été supprimé.`,
                    });
                    naviguer("/calendrier");
                  }}
                >
                  Supprimer
                </Button>
                <Button type="submit">Enregistrer les modifications</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageModifierEvenement;