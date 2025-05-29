import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Loader2, X, MapPin, Phone, Mail } from "lucide-react";

const locationData = [
  {
    city: "ISI SIÉGE – DAKAR",
    address: "123 Avenue de la République, Dakar",
    phone: "+221 33 123 4567",
    email: "dakar@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123488.4516195259!2d-17.55386245!3d14.716442549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5b3c5bb71%3A0xb17c17d92d5db21f!2sDakar%2C%20Senegal!5e0!3m2!1sen!2sus!4v1684998345943!5m2!1sen!2sus"
  },
  {
    city: "ISI-KEUR MASSAR",
    address: "45 Avenue Principale, Keur Massar",
    phone: "+221 33 234 5678",
    email: "keurmassar@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123550.60866827796!2d-17.45!3d14.783333300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172c792d5e683%3A0xe0cf427c2d0e1855!2sKeur%20Massar%2C%20Senegal!5e0!3m2!1sen!2sus!4v1716657333349!5m2!1sen!2sus"
  },
  {
    city: "ISI-SUPTECH",
    address: "78 Rue de la Technologie, Dakar",
    phone: "+221 33 345 6789",
    email: "suptech@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123488.4516195259!2d-17.55386245!3d14.716442549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5b3c5bb71%3A0xb17c17d92d5db21f!2sDakar%2C%20Senegal!5e0!3m2!1sen!2sus!4v1684998345943!5m2!1sen!2sus"
  },
  {
    city: "ISI KAOLACK",
    address: "25 Avenue du Baobab, Kaolack",
    phone: "+221 33 456 7890",
    email: "kaolack@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62072.26775956598!2d-16.10000005!3d14.133333300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec6cc30329ec901%3A0xadb370b5eaf9b193!2sKaolack%2C%20Senegal!5e0!3m2!1sen!2sus!4v1716657408043!5m2!1sen!2sus"
  },
  {
    city: "ISI-DIOURBEL",
    address: "15 Rue du Marché, Diourbel",
    phone: "+221 33 567 8901",
    email: "diourbel@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61896.81025918109!2d-16.266666699999998!3d14.733333300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec6ee28316b943f%3A0x72e2d28c52f6eb84!2sDiourbel%2C%20Senegal!5e0!3m2!1sen!2sus!4v1716657457131!5m2!1sen!2sus"
  },
  {
    city: "ISI-KAFFRINE",
    address: "32 Boulevard Central, Kaffrine",
    phone: "+221 33 678 9012",
    email: "kaffrine@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61980.06887722522!2d-15.55!3d14.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec72c3b09d82af9%3A0xed9d5f4135bcd068!2sKaffrine%2C%20Senegal!5e0!3m2!1sen!2sus!4v1716657492658!5m2!1sen!2sus"
  },
  {
    city: "ISI ZIGUINCHOR",
    address: "57 Avenue du Port, Ziguinchor",
    phone: "+221 33 789 0123",
    email: "ziguinchor@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123946.12271017698!2d-16.3!3d12.566666699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xee9d5c6f319aeeb%3A0x4df1e3c48c093c67!2sZiguinchor%2C%20Senegal!5e0!3m2!1sen!2sus!4v1716657530532!5m2!1sen!2sus"
  },
  {
    city: "ISI-KOMUNIK NOUAKCHOTT & NOUADHIBOU",
    address: "89 Avenue des Dunes, Nouakchott, Mauritanie",
    phone: "+222 45 123 456",
    email: "nouakchott@isimemo.edu",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122390.05939487567!2d-16!3d18.116666699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe965354a4dd6ed%3A0x3d0e06ab9cf8f715!2sNouakchott%2C%20Mauritania!5e0!3m2!1sen!2sus!4v1716657570675!5m2!1sen!2sus"
  }
];

// Composant du formulaire de contact
const EnhancedContactForm = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-navy-800">Envoyez-nous un message</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-navy-700">Nom complet</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="Votre nom"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-navy-700">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="votre.email@exemple.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-navy-700">Sujet</label>
          <input 
            type="text" 
            id="subject" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Sujet de votre message"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-navy-700">Message</label>
          <textarea 
            id="message" 
            rows={6} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="Votre message ici..."
          ></textarea>
        </div>
        
        <div className="flex items-center">
          <input type="checkbox" id="consent" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
          <label htmlFor="consent" className="ml-2 block text-sm text-navy-600">
            J'accepte que mes données soient traitées conformément à la politique de confidentialité
          </label>
        </div>
        
        <motion.button 
          className="w-full py-4 bg-gradient-to-r from-primary to-primary-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Envoyer le message
        </motion.button>
      </div>
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact - ISIMemo";
  }, []);

  // Interface pour le type de carte active
  interface ActiveMap {
    url: string;
    name: string;
  }

  // État pour contrôler l'affichage de la carte
  const [activeMap, setActiveMap] = useState<ActiveMap | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Fonction pour afficher la carte d'un campus
  const showMap = (mapUrl: string, campusName: string): void => {
    setActiveMap({ url: mapUrl, name: campusName });
  };
  
  // Fonction pour fermer la carte
  const closeMap = (): void => {
    setActiveMap(null);
  };

  // Fonction pour grouper les campus par région
  const getCampusByRegion = (region: string) => {
    if (region === 'all') return locationData;
    
    if (region === 'dakar') {
      return locationData.filter(loc => 
        loc.city.includes('DAKAR') || 
        loc.city.includes('KEUR MASSAR') || 
        loc.city.includes('SUPTECH')
      );
    }
    
    if (region === 'other') {
      return locationData.filter(loc => 
        !loc.city.includes('DAKAR') && 
        !loc.city.includes('KEUR MASSAR') && 
        !loc.city.includes('SUPTECH') &&
        !loc.city.includes('NOUAKCHOTT')
      );
    }
    
    if (region === 'mauritanie') {
      return locationData.filter(loc => 
        loc.city.includes('NOUAKCHOTT') || 
        loc.city.includes('NOUADHIBOU')
      );
    }
    
    return [];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section avec 100vh */}
      <motion.div
        className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-blue-600 overflow-hidden h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cercles décoratifs animés */}
        <motion.div
          className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-white opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-blue-300 opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-yellow-200 opacity-20"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-primary-300 opacity-20"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Contenu principal */}
        <div className="container-fluid relative z-10 flex-grow flex flex-col justify-center items-center px-4">
          <div className="max-w-4xl mx-auto text-center mt-16">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium mb-4">
                <span className="material-icons text-yellow-200 text-xs mr-1" style={{ verticalAlign: 'middle' }}>
                  contact_support
                </span>
                Nous sommes à votre écoute
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Contactez <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                l'ISI
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Nous sommes à votre disposition pour répondre à toutes vos questions concernant 
              nos formations, notre plateforme ISIMemo ou tout autre renseignement.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a href="#contactForm">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 text-primary-600 font-medium rounded-full shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="material-icons mr-2">send</span>
                  Envoyer un message
                </motion.button>
              </a>
              <a href="#locations">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 font-medium rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="material-icons mr-2">location_on</span>
                  Nos campus
                </motion.button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Indicateur de défilement */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 1 },
            y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={() => {
            const contactFormElement = document.getElementById('contactForm');
            if (contactFormElement) {
              contactFormElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Défiler pour en savoir plus</span>
            <span className="material-icons text-white">expand_more</span>
          </div>
        </motion.div>

        {/* Vagues décoratives au bas du hero */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 110" className="fill-white">
            <path d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </motion.div>

      {/* Informations de contact et formulaire */}
      <section id="contactForm" className="section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:col-span-5"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-navy">Restons en Contact</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-300 to-primary rounded-full mb-8"></div>
                <p className="text-navy-700 mb-8">
                  Vous avez une question sur nos formations, notre plateforme ISIMemo ou vous souhaitez simplement 
                  nous faire part de vos commentaires ? N'hésitez pas à nous contacter par l'un des moyens suivants.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: "call", title: "Appelez-nous", content: "+221 33 123 4567" },
                  { icon: "email", title: "Envoyez-nous un email", content: "contact@isimemo.edu" },
                  { icon: "schedule", title: "Heures d'ouverture", content: "Lun - Ven: 8h00 - 18h00" }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-primary text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800 text-lg">{item.title}</h3>
                      <p className="text-navy-600">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex space-x-4">
                {[
                  { icon: "facebook", color: "bg-blue-500 hover:bg-blue-600" },
                  { icon: "twitter", color: "bg-sky-500 hover:bg-sky-600" },
                  { icon: "linkedin", color: "bg-blue-700 hover:bg-blue-800" },
                  { icon: "youtube", color: "bg-red-600 hover:bg-red-700" }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href="#"
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white transition-all`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="material-icons text-sm">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <EnhancedContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Campus - Design totalement repensé avec carte intégrée */}
      <section id="locations" className="section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-navy">Nos Campus</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-300 to-primary rounded-full mx-auto mb-6"></div>
            <p className="text-navy-700">
              Découvrez nos campus modernes et équipés, présents au Sénégal et en Mauritanie.
            </p>
          </motion.div>

          {/* Onglets de filtrage */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'Tous les campus' },
              { id: 'dakar', label: 'Région de Dakar' },
              { id: 'other', label: 'Autres régions du Sénégal' },
              { id: 'mauritanie', label: 'Mauritanie' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-navy-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Affichage en deux colonnes: liste de campus et carte interactive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Liste des campus */}
            <div className="lg:col-span-5 space-y-4 flex flex-col">
              <div className="bg-white p-4 rounded-xl shadow-md mb-4">
                <h3 className="font-bold text-navy-800 text-lg mb-2">Sélectionnez un campus pour voir sa localisation</h3>
                <p className="text-navy-600 text-sm">Cliquez sur un campus ci-dessous pour afficher sa position sur la carte</p>
              </div>

              <div className="flex-grow overflow-auto pr-2 space-y-3 max-h-[550px]">
                {getCampusByRegion(activeTab).map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      activeMap && activeMap.name === location.city 
                        ? 'bg-primary-50 border-primary' 
                        : 'bg-white border-gray-200 hover:border-primary-200 hover:bg-blue-50'
                    }`}
                    onClick={() => showMap(location.map, location.city)}
                  >
                    <h3 className="font-bold text-navy-800">{location.city}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start">
                        <MapPin size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <span className="text-navy-700 text-sm">{location.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-primary mr-2 flex-shrink-0" />
                        <span className="text-navy-700 text-sm">{location.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="text-primary mr-2 flex-shrink-0" />
                        <span className="text-navy-700 text-sm">{location.email}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Carte Interactive */}
            <motion.div 
              className="lg:col-span-7 bg-white rounded-xl shadow-lg overflow-hidden h-[550px] sticky top-24"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="border-b border-gray-200 p-3 flex justify-between items-center">
                <h3 className="font-bold text-navy-800">{activeMap ? `Campus de ${activeMap.name}` : 'Sélectionnez un campus'}</h3>
                {activeMap && (
                  <button 
                    onClick={closeMap}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-navy-700" />
                  </button>
                )}
              </div>
              
              <div className="relative h-full">
                {!activeMap ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <MapPin size={48} className="text-gray-300 mb-4" />
                    <p className="text-navy-600">Veuillez sélectionner un campus pour afficher sa localisation</p>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                    <iframe 
                      src={activeMap.url} 
                      className="w-full h-full border-0" 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Carte du campus ${activeMap.name}`}
                    ></iframe>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-navy">Questions Fréquentes</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-300 to-primary rounded-full mx-auto mb-6"></div>
            <p className="text-navy-700">
              Vous avez des questions ? Consultez notre FAQ pour trouver rapidement des réponses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            {[
              { 
                question: "Comment puis-je m'inscrire à l'ISI ?", 
                answer: "Pour vous inscrire à l'ISI, vous devez déposer un dossier de candidature en ligne ou directement dans l'un de nos campus. Une fois votre dossier accepté, vous serez convoqué pour un test d'admission."
              },
              { 
                question: "Quelles sont les formations disponibles ?", 
                answer: "L'ISI propose plusieurs formations dans le domaine de l'informatique et du numérique : génie logiciel, réseaux et télécommunications, intelligence artificielle, cybersécurité, et bien d'autres."
              },
              { 
                question: "Comment fonctionne la plateforme ISIMemo ?", 
                answer: "ISIMemo est une plateforme intelligente de gestion des mémoires académiques qui permet aux étudiants de soumettre leurs travaux, de rechercher des références et de collaborer avec leurs encadreurs."
              },
              { 
                question: "Les diplômes de l'ISI sont-ils reconnus internationalement ?", 
                answer: "Oui, les diplômes délivrés par l'ISI sont reconnus internationalement grâce à nos accréditations et nos partenariats avec des institutions prestigieuses du monde entier."
              },
              { 
                question: "Proposez-vous des bourses d'études ?", 
                answer: "Oui, l'ISI propose des bourses d'excellence et des aides financières pour les étudiants méritants. Les critères d'attribution sont basés sur les résultats académiques et la situation socio-économique."
              },
              { 
                question: "Est-il possible de suivre des cours en ligne ?", 
                answer: "Oui, certaines formations de l'ISI peuvent être suivies entièrement en ligne ou en format hybride, combinant des sessions présentielles et à distance."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 hover:bg-primary-50 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-3 text-navy-800 flex items-start">
                  <span className="material-icons text-primary mr-2 flex-shrink-0">help_outline</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-navy-700 ml-8">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-navy-700 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <motion.button 
              className="btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-icons mr-2">contact_support</span>
              Contactez notre équipe support
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Contact;