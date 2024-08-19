//play.tsx
const componentMap: Record<string, () => Promise<{ default: React.FC }>> = {
    LandingPage3: () => import('@/components/Home/LandingPages/LandingPage3'),
    // Add other components here as needed
  };
  
  export default componentMap; // Export as default
  