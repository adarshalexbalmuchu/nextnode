
import { useState } from 'react';
import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, TrendingUp, Clock, Calendar } from 'lucide-react';
import { mockPosts, categories } from '@/data/mockPosts';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'readTime':
        return a.readTime - b.readTime;
      default: // newest
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-navy via-navy-600 to-navy-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-20" />
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-neon-purple" />
          
          <div className="container mx-auto container-padding text-center relative">
            <div className="max-w-4xl mx-auto animate-fade-up">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2">
                🧠 AI & Tech Insights
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                The Future of{' '}
                <span className="gradient-text">Technology</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive collection of articles on artificial intelligence, 
                emerging technologies, and future innovations that are reshaping our world.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-16 z-40">
          <div className="container mx-auto container-padding">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-3xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="search"
                    placeholder="Search the future of tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg bg-muted/30 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-56 h-12 bg-muted/30 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300">
                    <Filter className="w-4 h-4 mr-2 text-primary" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-primary/20">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 h-12 bg-muted/30 border-muted hover:border-primary/50">
                    <TrendingUp className="w-4 h-4 mr-2 text-accent" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-primary/20">
                    <SelectItem value="newest">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Newest First
                      </div>
                    </SelectItem>
                    <SelectItem value="oldest">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Oldest First
                      </div>
                    </SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="readTime">Read Time</SelectItem>
                  </SelectContent>
                </Select>
                
                <Badge variant="secondary" className="text-sm bg-primary/10 text-primary border-primary/20">
                  {sortedPosts.length} article{sortedPosts.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="section-padding">
          <div className="container mx-auto container-padding">
            {sortedPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {sortedPosts.map((post, index) => (
                    <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="text-center">
                  <Button size="lg" className="btn-primary group text-lg px-8 py-4">
                    Load More Articles
                    <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 animate-fade-up">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">No articles found</h3>
                <p className="text-muted-foreground mb-8 text-lg max-w-lg mx-auto">
                  Try adjusting your search criteria or explore all categories to discover amazing content.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
