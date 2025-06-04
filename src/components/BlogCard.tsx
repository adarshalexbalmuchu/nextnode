
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Clock, Eye } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image?: string;
  featured?: boolean;
  views?: number;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const BlogCard = ({ post, variant = 'default', className = '' }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (variant === 'featured') {
    return (
      <Card className={`group overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 hover:shadow-glow-lg transition-all duration-500 card-hover glow-border ${className}`}>
        <div className="relative">
          {post.image && (
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-primary to-accent text-navy font-medium shadow-glow">
              ✨ Featured
            </Badge>
          </div>
          {post.views && (
            <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full">
              <div className="flex items-center space-x-1 text-white text-sm">
                <Eye className="w-3 h-3" />
                <span>{post.views.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-8">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              {post.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <h3 className="text-3xl font-display font-bold mb-4 group-hover:gradient-text transition-all duration-500 line-clamp-2 leading-tight">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-lg">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-navy" />
              </div>
              <div>
                <div className="text-sm font-medium">{post.author}</div>
                <div className="text-xs text-muted-foreground">AI Researcher</div>
              </div>
            </div>
            
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center text-primary hover:text-accent font-medium group-hover:translate-x-2 transition-all duration-300 group"
            >
              Read More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`group overflow-hidden hover:shadow-glow transition-all duration-300 card-hover border-border/50 hover:border-primary/50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {post.image && (
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-3 text-xs bg-primary/10 text-primary border-primary/20">
                {post.category}
              </Badge>
              
              <h4 className="font-display font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h4>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readTime} min</span>
                {post.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`group overflow-hidden hover:shadow-glow transition-all duration-500 card-hover border-border/50 hover:border-primary/30 ${className}`}>
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {post.views && (
            <div className="absolute top-3 right-3 glass-effect px-2 py-1 rounded-full">
              <div className="flex items-center space-x-1 text-white text-xs">
                <Eye className="w-3 h-3" />
                <span>{post.views}</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            {post.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sm">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-navy" />
          </div>
          <span className="font-medium">{post.author}</span>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <Link
          to={`/blog/${post.id}`}
          className="text-primary hover:text-accent font-medium group-hover:translate-x-1 transition-all duration-300 inline-flex items-center group"
        >
          Read More
          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
