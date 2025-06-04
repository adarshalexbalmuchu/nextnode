
import { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Clock, ArrowRight, Zap, Brain, Rocket, Star } from 'lucide-react';
import { mockPosts, categories, getFeaturedPosts, getRecentPosts } from '@/data/mockPosts';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(6);

  const filteredPosts = selectedCategory 
    ? mockPosts.filter(post => post.category === selectedCategory)
    : recentPosts;

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Featured Content Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/30 relative">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container mx-auto container-padding relative">
          <div className="text-center mb-16 animate-fade-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              ✨ Featured Insights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
              The Future is Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Dive deep into the most impactful developments in AI, machine learning, 
              and emerging technologies that are reshaping our world.
            </p>
          </div>

          {featuredPosts.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <div className="animate-slide-right">
                <BlogCard post={featuredPosts[0]} variant="featured" />
              </div>
              <div className="space-y-6 animate-slide-left">
                {recentPosts.slice(1, 4).map((post, index) => (
                  <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <BlogCard post={post} variant="compact" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding relative">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Explore by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover content tailored to your interests in cutting-edge technology domains.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-16 animate-scale-in">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={`btn-glass hover:btn-primary transition-all duration-300 ${selectedCategory === null ? 'bg-gradient-to-r from-primary to-accent text-navy' : ''}`}
            >
              All Posts
            </Button>
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`btn-glass hover:btn-primary transition-all duration-300 ${selectedCategory === category ? 'bg-gradient-to-r from-primary to-accent text-navy' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          <div className="text-center animate-scale-in">
            <Button size="lg" className="btn-primary group text-lg px-8 py-4">
              Explore All Articles
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-navy via-navy-600 to-navy-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-neon-purple" />
        
        <div className="container mx-auto container-padding relative">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="glass-dark border-primary/20 backdrop-blur-xl hover:shadow-glow transition-all duration-500 card-hover group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-navy" />
                </div>
                <h3 className="text-4xl font-display font-bold mb-3 gradient-text">10M+</h3>
                <p className="text-white/80 font-medium">Monthly Readers</p>
                <p className="text-white/60 text-sm mt-2">Growing exponentially</p>
              </CardContent>
            </Card>
            
            <Card className="glass-dark border-primary/20 backdrop-blur-xl hover:shadow-glow transition-all duration-500 card-hover group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent to-neon-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-display font-bold mb-3 gradient-text">50K+</h3>
                <p className="text-white/80 font-medium">Tech Leaders</p>
                <p className="text-white/60 text-sm mt-2">In our community</p>
              </CardContent>
            </Card>
            
            <Card className="glass-dark border-primary/20 backdrop-blur-xl hover:shadow-glow transition-all duration-500 card-hover group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-neon-purple to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-navy" />
                </div>
                <h3 className="text-4xl font-display font-bold mb-3 gradient-text">500+</h3>
                <p className="text-white/80 font-medium">AI Insights</p>
                <p className="text-white/60 text-sm mt-2">Expert articles</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="section-padding bg-gradient-to-b from-muted/20 to-background relative">
        <div className="absolute inset-0 mesh-bg opacity-5" />
        <div className="container mx-auto container-padding text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <div className="mb-8">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                🚀 Join the Future
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Stay at the <span className="gradient-text">Forefront</span> of Innovation
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Join thousands of tech leaders, researchers, and visionaries who rely on NextNode 
                for the latest insights in AI and emerging technologies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg"
              />
              <Button size="lg" className="btn-primary group text-lg px-8 py-4">
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Subscribe Now
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center glass-effect px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-primary mr-2" />
                Weekly insights
              </div>
              <div className="flex items-center glass-effect px-4 py-2 rounded-full">
                <Rocket className="w-4 h-4 text-accent mr-2" />
                No spam, ever
              </div>
              <div className="flex items-center glass-effect px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-neon-purple mr-2" />
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
