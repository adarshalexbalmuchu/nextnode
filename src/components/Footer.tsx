
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Zap, Brain, Rocket, Star, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Content',
      links: [
        { name: 'Latest Posts', href: '/blog' },
        { name: 'AI & Machine Learning', href: '/blog?category=AI' },
        { name: 'Deep Tech', href: '/blog?category=Deep+Tech' },
        { name: 'Future Tech', href: '/blog?category=Future+Tech' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Team', href: '/about#team' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Newsletter', href: '/newsletter' },
        { name: 'RSS Feed', href: '/rss' },
        { name: 'API', href: '/api' },
        { name: 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-muted/30 to-navy border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-neon-purple" />
      
      <div className="container mx-auto container-padding py-16 relative">
        {/* Newsletter Section */}
        <div className="mb-16 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            🚀 Join the Future
          </Badge>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 gradient-text">
            Stay Ahead of the Curve
          </h3>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Get the latest insights on AI, tech innovations, and future trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 bg-muted/30 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300"
            />
            <Button className="btn-primary group h-12 px-8">
              <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="mb-16 bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow">
                  <Zap className="w-6 h-6 text-navy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <span className="text-2xl font-display font-bold gradient-text">NextNode</span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Exploring the frontier of artificial intelligence, emerging technologies, 
              and the innovations shaping our digital future.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 group">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 group">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-semibold mb-6 text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8 bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <p>© {currentYear} NextNode. All rights reserved.</p>
            <div className="flex items-center space-x-2">
              <Star className="w-3 h-3 text-primary" />
              <span className="text-xs">Made with AI</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
