import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Clock, GlobeIcon, MapPinIcon, AlertCircleIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Schéma de validation avec Zod
const schemaFormulaire = z.object({
  titre: z.string().min(3, { message: "Le titre doit comporter au moins 3 caractères" }),
  typeEvenement: z.enum(["reunion", "seminaire", "deadline", "autre"], {
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
  }).optional(),
  modalite: z.enum(["presentiel", "ligne"]).optional(),
  lieu: z.string().optional(),
  lienVirtuel: z.string().optional(),
  participants: z.string().optional(),
  description: z.string().optional(),
  important: z.boolean().default(false)
}).refine((data) => {
  // Si c'est une réunion ou un séminaire, la modalité est obligatoire
  if ((data.typeEvenement === "reunion" || data.typeEvenement === "seminaire") && !data.modalite) {
    return false;
  }
  // Si en ligne, le lien virtuel est obligatoire
  if (data.modalite === "ligne" && (!data.lienVirtuel || data.lienVirtuel.length < 5)) {
    return false;
  }
  // Si présentiel, le lieu est obligatoire
  if (data.modalite === "presentiel" && (!data.lieu || data.lieu.length < 2)) {
    return false;
  }
  // Pour les réunions et séminaires, les participants sont obligatoires
  if ((data.typeEvenement === "reunion" || data.typeEvenement === "seminaire") && 
      (!data.participants || data.participants.length < 3)) {
    return false;
  }
  return true;
}, {
  message: "Des informations requises sont manquantes selon le type d'événement sélectionné",
  path: ["typeEvenement"],
});

const PageAjoutEvenement: React.FC = () => {
  const { toast } = useToast();
  const naviguer = useNavigate();
  
  const formulaire = useForm<z.infer<typeof schemaFormulaire>>({
    resolver: zodResolver(schemaFormulaire),
    defaultValues: {
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
      important: false
    },
  });

  // Observer les changements
  const typeEvenementSelectionne = formulaire.watch("typeEvenement");
  const modaliteSelectionnee = formulaire.watch("modalite");

  // Vérifier s'il s'agit d'un type qui nécessite une modalité
  const necessiteModalite = typeEvenementSelectionne === "reunion" || typeEvenementSelectionne === "seminaire";

  function onSubmit(valeurs: z.infer<typeof schemaFormulaire>) {
    console.log(valeurs);
    
    // Simuler l'ajout d'un événement (à remplacer par l'appel API réel)
    setTimeout(() => {
      toast({
        title: "Événement ajouté",
        description: `L'événement "${valeurs.titre}" a été ajouté au calendrier.`,
      });
      naviguer("/calendrier");
    }, 1000);
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Ajouter un événement</h1>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Nouvel événement</CardTitle>
          <CardDescription>
            Entrez les détails de l'événement à ajouter au calendrier.
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
                          <SelectItem value="seminaire">Séminaire</SelectItem>
                          <SelectItem value="deadline">Date limite</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
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
                            classNames={{
                              months: "w-full",
                              month: "w-full",
                              table: "w-full border-collapse",
                              head_cell: "text-muted-foreground rounded-md w-10 font-normal text-sm",
                              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                              day_today: "bg-accent text-accent-foreground",
                              day_outside: "text-muted-foreground opacity-50"
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Heures de début */}
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

                  {/* Heure de fin (conditionnelle, pas nécessaire pour les deadlines) */}
                  {typeEvenementSelectionne !== "deadline" && (
                    <FormField
                      control={formulaire.control}
                      name="heureFin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heure de fin</FormLabel>
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
                  )}
                </div>

                {/* Événement important */}
                <FormField
                  control={formulaire.control}
                  name="important"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 md:col-span-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <AlertCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                          Événement important
                        </FormLabel>
                        <FormDescription>
                          Les événements importants sont mis en évidence dans le calendrier
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Affichage conditionnel selon le type d'événement */}
                {necessiteModalite && (
                  <>
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

                    {/* Lieu (conditionnel - uniquement pour présentiel) */}
                    {modaliteSelectionnee === "presentiel" && (
                      <FormField
                        control={formulaire.control}
                        name="lieu"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Lieu*</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Salle de conférence A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Lien virtuel (conditionnel - uniquement pour en ligne) */}
                    {modaliteSelectionnee === "ligne" && (
                      <FormField
                        control={formulaire.control}
                        name="lienVirtuel"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Lien de connexion*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: https://zoom.us/j/123456789"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Lien Zoom, Google Meet, ou autre plateforme de visioconférence
                            </FormDescription>
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
                  </>
                )}

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
                <Button type="submit">Ajouter l'événement</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAjoutEvenement;