
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

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
      <Card className={`group overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 hover:shadow-2xl transition-all duration-500 ${className}`}>
        <div className="relative">
          {post.image && (
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-primary text-white">Featured</Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <span>{post.readTime} min read</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform"
            >
              Read More
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            {post.image && (
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-2 text-xs">
                {post.category}
              </Badge>
              
              <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h4>
              
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readTime} min</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
          <Badge variant="secondary">{post.category}</Badge>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{post.author}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{post.readTime} min read</span>
        </div>
        
        <Link
          to={`/blog/${post.id}`}
          className="text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center"
        >
          Read More
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
