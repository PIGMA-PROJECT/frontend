interface Window {
    accueil?: {
      mount: (options: { domElement: HTMLElement }) => void;
      unmount: () => void;
    };
  }