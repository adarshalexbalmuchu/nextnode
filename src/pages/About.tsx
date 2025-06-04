
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Lightbulb, Globe } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Editor & AI Research Lead',
      bio: 'Former Stanford AI Lab researcher with expertise in machine learning and neural networks.',
      specialties: ['Machine Learning', 'Neural Networks', 'AI Ethics'],
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Quantum Computing Specialist',
      bio: 'MIT professor and quantum computing pioneer with 20+ publications in top-tier journals.',
      specialties: ['Quantum Computing', 'Cryptography', 'Physics'],
    },
    {
      name: 'Dr. Alex Kim',
      role: 'Deep Learning Researcher',
      bio: 'Google DeepMind alumnus specializing in computer vision and natural language processing.',
      specialties: ['Computer Vision', 'NLP', 'Model Architecture'],
    },
    {
      name: 'Lisa Wang',
      role: 'Edge Computing Expert',
      bio: 'Former Apple engineer focused on bringing AI to edge devices and IoT systems.',
      specialties: ['Edge Computing', 'IoT', 'Mobile AI'],
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy First',
      description: 'We prioritize factual accuracy and rigorous fact-checking in every piece of content we publish.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'We spotlight breakthrough technologies and emerging trends that will shape the future.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our content is shaped by the needs and interests of our global tech community.',
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We cover developments from around the world, bringing diverse viewpoints to our readers.',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About NextNode
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're a team of researchers, engineers, and technologists dedicated to demystifying 
              the cutting-edge developments in artificial intelligence and emerging technologies.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                To bridge the gap between complex technological innovations and practical understanding, 
                making cutting-edge AI and tech developments accessible to professionals, researchers, 
                and enthusiasts worldwide.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="text-left">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4">What We Cover</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Artificial Intelligence & Machine Learning
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Quantum Computing & Advanced Physics
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Biotechnology & Digital Health
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Sustainable Technology Solutions
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Future Computing Paradigms
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-left">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4">Our Approach</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        Expert analysis from industry professionals
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        Clear explanations of complex concepts
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        Real-world applications and implications
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        Balanced perspective on benefits and risks
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        Forward-looking trend analysis
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our content creation and community engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                World-class experts bringing you the latest insights from the frontiers of technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Connect with thousands of tech professionals, researchers, and innovators 
                shaping the future of technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Subscribe to Newsletter
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Follow on LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
