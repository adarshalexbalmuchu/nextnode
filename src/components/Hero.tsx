
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Zap, Brain, Cpu, Rocket } from 'lucide-react';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Intelligence', 'Innovation', 'Future', 'Technology', 'Discovery'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-600 to-navy-800" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-float opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl animate-float opacity-20" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 rounded-full blur-3xl animate-pulse opacity-10" />

      {/* Tech Icons */}
      <div className="absolute top-20 left-20 animate-float opacity-20">
        <Brain className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute top-32 right-32 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Cpu className="w-10 h-10 text-accent" />
      </div>
      <div className="absolute bottom-32 left-32 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Rocket className="w-14 h-14 text-neon-purple" />
      </div>

      <div className="container mx-auto container-padding text-center relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-up">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
              The Future of{' '}
              <span className="relative inline-block">
                <span className="gradient-text animate-pulse">
                  {words[currentWord]}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-neon-purple/20 blur-2xl -z-10 animate-glow-pulse" />
              </span>
            </h1>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white">
              is Written Here
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dive deep into the cutting-edge world of artificial intelligence, 
            emerging technologies, and the innovations reshaping our tomorrow.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto mb-16">
            <Input
              type="email"
              placeholder="Enter your email for AI insights"
              className="flex-1 h-14 text-lg bg-white/10 backdrop-blur-sm border-2 border-primary/30 focus:border-primary placeholder:text-white/60 text-white"
            />
            <Button className="h-14 px-8 btn-primary group text-lg font-semibold">
              Get Insights
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Tech Leaders</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">200+</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Deep Insights</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Future Coverage</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">AI</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Powered</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
