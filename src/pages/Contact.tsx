
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Send, Zap } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-navy dark:via-navy-600 dark:to-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white">
              Get in <span className="bg-gradient-to-r from-primary via-accent to-neon-purple bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about AI, want to collaborate, or interested in contributing to NextNode? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card className="bg-white/50 dark:bg-navy/50 backdrop-blur-sm border border-gray-200 dark:border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-display text-gray-900 dark:text-white flex items-center">
                  <MessageSquare className="w-6 h-6 text-primary mr-3" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="John" 
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Doe" 
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input 
                    placeholder="What's this about?" 
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..." 
                    rows={6}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-300 group">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info & Newsletter */}
            <div className="space-y-8">
              
              {/* Contact Information */}
              <Card className="bg-white/50 dark:bg-navy/50 backdrop-blur-sm border border-gray-200 dark:border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-display text-gray-900 dark:text-white flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">hello@nextnode.ai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Partnerships</h4>
                    <p className="text-gray-600 dark:text-gray-300">partners@nextnode.ai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Press & Media</h4>
                    <p className="text-gray-600 dark:text-gray-300">press@nextnode.ai</p>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 backdrop-blur-sm border border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-display text-gray-900 dark:text-white flex items-center">
                    <Zap className="w-5 h-5 text-primary mr-3" />
                    Stay Updated
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Subscribe to our newsletter for the latest AI insights and tech innovations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-300">
                    Subscribe to Newsletter
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-lg p-6 border border-primary/20">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We typically respond within 24 hours during business days. For urgent matters, 
                  please include "URGENT" in your subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
