import { Trees } from "lucide-react";

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-primary/5 bg-surface dark:bg-surface/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background">
              <Trees size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">RootEXP</span>
          </div>
          <p className="text-foreground max-w-sm mb-8 leading-relaxed font-medium">
            Revolutionizing personal finance by making budgeting as addictive as your favorite game. Grow wealth, harvest financial freedom.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors text-primary">
              <TwitterIcon />
            </a>
            <a href="#" className="p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors text-primary">
              <InstagramIcon />
            </a>
            <a href="#" className="p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors text-primary">
              <GithubIcon />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm font-bold text-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Daily Quests</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Community Forest</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-bold text-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/5 text-center text-sm font-bold text-foreground/40">
        © 2026 RootEXP. Rooted in financial integrity.
      </div>
    </footer>
  );
}
