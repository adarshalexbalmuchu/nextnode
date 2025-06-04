
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Clock, Share, Bookmark } from 'lucide-react';
import { getPostById, mockPosts } from '@/data/mockPosts';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : null;

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedPosts = mockPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <article className="min-h-screen">
        {/* Header */}
        <header className="bg-gradient-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Link>

              <Badge className="mb-4 bg-primary text-white">
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-1">
                {/* Action Buttons */}
                <div className="flex items-center gap-4 mb-8">
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {post.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-4xl font-bold mb-6 mt-8">
                          {paragraph.slice(2)}
                        </h1>
                      );
                    } else if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-3xl font-semibold mb-4 mt-8">
                          {paragraph.slice(3)}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-2xl font-semibold mb-3 mt-6">
                          {paragraph.slice(4)}
                        </h3>
                      );
                    } else if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="mb-2">
                          {paragraph.slice(2)}
                        </li>
                      );
                    } else if (paragraph.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>

                {/* Author Bio */}
                <Separator className="my-12" />
                <div className="flex items-start space-x-4 p-6 bg-muted/50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{post.author}</h4>
                    <p className="text-muted-foreground">
                      Expert in {post.category.toLowerCase()} with over a decade of experience 
                      in cutting-edge technology research and development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents */}
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">Table of Contents</h3>
                    <nav className="space-y-2 text-sm">
                      <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                        Introduction
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                        Current State
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                        Future Directions
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                        Challenges
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                        Conclusion
                      </a>
                    </nav>
                  </div>

                  {/* Newsletter CTA */}
                  <div className="p-6 bg-gradient-primary text-white rounded-lg">
                    <h3 className="font-semibold mb-2">Stay Updated</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Get the latest insights delivered to your inbox.
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
