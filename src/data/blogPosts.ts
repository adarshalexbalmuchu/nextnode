
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Large Language Models: Beyond GPT-4 and What\'s Coming Next',
    excerpt: 'Exploring the evolution of AI language models and their potential impact on industries, from multimodal capabilities to enhanced reasoning and real-world applications.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    category: 'AI Innovations',
    author: 'Dr. Sarah Chen',
    publishDate: 'May 22, 2024',
    readTime: '8 min read',
    tags: ['LLM', 'GPT', 'Natural Language Processing', 'AI Research']
  },
  {
    id: '2',
    title: 'Autonomous AI Agents: The Next Frontier in Artificial Intelligence',
    excerpt: 'How autonomous AI agents are revolutionizing business processes and decision-making, with real-world case studies and implementation strategies.',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    category: 'AI Innovations',
    author: 'Marcus Rodriguez',
    publishDate: 'May 20, 2024',
    readTime: '6 min read',
    tags: ['Autonomous AI', 'Business Automation', 'Machine Learning']
  },
  {
    id: '3',
    title: 'Quantum Computing Meets AI: Breakthrough Algorithms and Real-World Applications',
    excerpt: 'The convergence of quantum computing and artificial intelligence is opening new possibilities for solving complex problems previously thought impossible.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    category: 'Technology News',
    author: 'Prof. Elena Vasquez',
    publishDate: 'May 18, 2024',
    readTime: '10 min read',
    tags: ['Quantum Computing', 'AI Algorithms', 'Innovation']
  },
  {
    id: '4',
    title: 'The Ethics of AI in Healthcare: Balancing Innovation with Patient Privacy',
    excerpt: 'Examining the ethical considerations and regulatory frameworks needed as AI transforms medical diagnosis, treatment, and patient care.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    category: 'Industry Insights',
    author: 'Dr. James Park',
    publishDate: 'May 16, 2024',
    readTime: '7 min read',
    tags: ['AI Ethics', 'Healthcare', 'Privacy', 'Regulation']
  },
  {
    id: '5',
    title: 'Computer Vision Revolution: How AI is Transforming Visual Recognition',
    excerpt: 'From autonomous vehicles to medical imaging, explore how computer vision is reshaping industries through advanced AI-powered visual recognition.',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    category: 'AI Innovations',
    author: 'Lisa Thompson',
    publishDate: 'May 14, 2024',
    readTime: '9 min read',
    tags: ['Computer Vision', 'Image Recognition', 'Deep Learning']
  },
  {
    id: '6',
    title: 'Edge AI: Bringing Intelligence to IoT Devices and Beyond',
    excerpt: 'How edge computing is enabling AI capabilities in everyday devices, reducing latency and improving privacy in connected systems.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    category: 'Technology News',
    author: 'Ahmed Hassan',
    publishDate: 'May 12, 2024',
    readTime: '5 min read',
    tags: ['Edge AI', 'IoT', 'Edge Computing', 'Hardware']
  }
];
