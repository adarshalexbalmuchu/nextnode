
import { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Insights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep dives into the most impactful developments in AI and emerging technologies.
            </p>
          </div>

          {featuredPosts.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <BlogCard post={featuredPosts[0]} variant="featured" />
              <div className="space-y-6">
                {recentPosts.slice(1, 4).map((post) => (
                  <BlogCard key={post.id} post={post} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover content tailored to your interests in cutting-edge technology domains.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-gradient-primary text-white" : ""}
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-primary text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90">
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">10M+</h3>
                <p className="text-white/80">Monthly Readers</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-3xl font-bold mb-2">50K+</h3>
                <p className="text-white/80">Community Members</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">500+</h3>
                <p className="text-white/80">Expert Articles</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay at the Forefront of Innovation
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of tech leaders, researchers, and enthusiasts who rely on NextNode 
              for the latest insights in AI and emerging technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90">
                Subscribe Now
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-2">✓</Badge>
                Weekly insights
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-2">✓</Badge>
                No spam, ever
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-2">✓</Badge>
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
