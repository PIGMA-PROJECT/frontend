import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt', { email, password, rememberMe });
    // Logique de connexion à implémenter
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
      {/* Formulaire de connexion à gauche */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <motion.div 
                className="flex items-center justify-center gap-2 text-white text-3xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </div>
                <span>ISI<span className="text-primary-300">Memo</span></span>
              </motion.div>
            </Link>
          </div>

          <Card className="border-0 bg-white/10 backdrop-blur-lg shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-white text-center">Connexion</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Bienvenue à nouveau ! Entrez vos identifiants pour accéder à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-200 flex items-center">
                    <span className="material-icons text-primary-400 text-base mr-2">mail</span>
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/20 border-gray-500 placeholder:text-gray-400 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-gray-200 flex items-center">
                      <span className="material-icons text-primary-400 text-base mr-2">lock</span>
                      Mot de passe
                    </label>
                    <Link to="/forgot-password" className="text-sm font-medium text-primary-300 hover:text-primary-200">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/20 border-gray-500 placeholder:text-gray-400 text-white"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-500 text-primary focus:ring-primary-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                    Rester connecté
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                >
                  <span className="material-icons text-sm mr-2">login</span>
                  Se connecter
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            © 2025 ISIMemo. Tous droits réservés.
          </div>
        </motion.div>
      </div>
      
      {/* Partie informative à droite */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-navy-800/10 to-navy-900/80 z-10"></div>
        <img 
          src="/lovable-uploads/d588601e-420f-4f80-91ca-859afa44bd92.png" 
          alt="Diplômée" 
          className="absolute h-full w-full object-cover object-center" 
        />
        
        <motion.div 
          className="absolute inset-0 z-20 flex items-center p-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="max-w-md">
            <motion.div 
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                className="w-14 h-14 bg-primary-500/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="material-icons text-2xl text-primary-300">auto_stories</span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Gérez vos mémoires académiques
              </motion.h2>
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Accédez à notre plateforme innovante pour soumettre, consulter et gérer vos mémoires universitaires avec facilité.
              </motion.p>
              
              <motion.div 
                className="mt-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30">
                    <span className="material-icons text-white">verified</span>
                  </div>
                  <span className="text-white font-medium">Solution approuvée par les académiciens</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600/80 flex items-center justify-center shadow-lg shadow-primary-600/30">
                    <span className="material-icons text-white">security</span>
                  </div>
                  <span className="text-white font-medium">Sécurité et confidentialité garanties</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600/60 flex items-center justify-center shadow-lg shadow-primary-600/30">
                    <span className="material-icons text-white">devices</span>
                  </div>
                  <span className="text-white font-medium">Accessible sur tous vos appareils</span>
                </div>
              </motion.div>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full ring-2 ring-navy-900" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" />
                    <img className="w-8 h-8 rounded-full ring-2 ring-navy-900" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" />
                    <img className="w-8 h-8 rounded-full ring-2 ring-navy-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-bold text-white">500+</span> étudiants ont déjà rejoint la plateforme
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;