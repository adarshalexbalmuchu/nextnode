
import { BlogPost } from '@/components/BlogCard';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Large Language Models: Beyond ChatGPT',
    excerpt: 'Exploring the next generation of AI language models and their potential impact on human-computer interaction, from multimodal capabilities to reasoning breakthroughs.',
    content: `
# The Future of Large Language Models: Beyond ChatGPT

The landscape of artificial intelligence has been dramatically reshaped by the emergence of large language models (LLMs). From GPT-3's initial breakthrough to ChatGPT's mainstream adoption, we've witnessed unprecedented capabilities in natural language understanding and generation.

## The Current State of LLMs

Today's language models have achieved remarkable feats:

- **Human-level conversation**: Engaging in nuanced, context-aware discussions
- **Code generation**: Writing functional programs across multiple languages
- **Creative writing**: Producing poetry, stories, and screenplays
- **Problem-solving**: Tackling complex analytical and mathematical challenges

## What's Next?

The future holds even more exciting possibilities:

### Multimodal Integration
Next-generation models will seamlessly process text, images, audio, and video, creating truly versatile AI assistants.

### Enhanced Reasoning
We're moving toward models that can perform complex logical reasoning, planning, and causal inference.

### Specialized Expertise
Domain-specific models will emerge, offering unprecedented expertise in fields like medicine, law, and scientific research.

## Challenges Ahead

Despite the promise, significant challenges remain:
- Computational efficiency and energy consumption
- Bias mitigation and fairness
- Alignment with human values
- Hallucination and factual accuracy

The journey toward artificial general intelligence continues, with language models serving as a crucial stepping stone toward that ambitious goal.
    `,
    category: 'AI & Machine Learning',
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-01-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'Quantum Computing Breakthroughs in 2024',
    excerpt: 'Recent advances in quantum error correction and practical quantum algorithms are bringing us closer to quantum advantage in real-world applications.',
    content: `
# Quantum Computing Breakthroughs in 2024

This year has marked significant milestones in quantum computing, with breakthrough achievements in error correction, algorithm development, and practical applications.

## Major Developments

### Error Correction Advances
IBM and Google have made substantial progress in quantum error correction, demonstrating logical qubits that maintain coherence for unprecedented durations.

### Practical Applications
Financial modeling, drug discovery, and optimization problems are now being tackled with quantum algorithms showing clear advantages over classical approaches.

## Looking Forward

The quantum computing landscape is evolving rapidly, with implications for:
- Cryptography and security
- Materials science
- Artificial intelligence
- Financial markets

We're approaching an inflection point where quantum computers will solve problems impossible for classical systems.
    `,
    category: 'Quantum Computing',
    author: 'Prof. Michael Rodriguez',
    publishedAt: '2024-01-12',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
  },
  {
    id: '3',
    title: 'Neural Architecture Search: Automating AI Design',
    excerpt: 'How automated machine learning is revolutionizing the way we design neural networks, making AI development more accessible and efficient.',
    content: `
# Neural Architecture Search: Automating AI Design

Neural Architecture Search (NAS) represents a paradigm shift in how we approach machine learning model design, automating the traditionally manual process of neural network architecture creation.

## The Evolution of NAS

From early grid search methods to sophisticated evolutionary algorithms and reinforcement learning approaches, NAS has evolved to discover architectures that surpass human-designed networks.

## Key Benefits

- **Efficiency**: Reduced time and expertise required for model design
- **Performance**: Often discovers superior architectures
- **Scalability**: Can explore vast search spaces impossible for humans
- **Democratization**: Makes advanced AI accessible to non-experts

## Challenges and Limitations

Despite its promise, NAS faces computational costs, search space complexity, and transferability issues that the research community continues to address.

## Future Directions

The field is moving toward more efficient search strategies, multi-objective optimization, and hardware-aware architecture design.
    `,
    category: 'Deep Learning',
    author: 'Dr. Alex Kim',
    publishedAt: '2024-01-10',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
  },
  {
    id: '4',
    title: 'The Rise of Edge AI: Processing at the Source',
    excerpt: 'Edge computing is transforming AI deployment, bringing intelligence closer to data sources for reduced latency and enhanced privacy.',
    content: `
# The Rise of Edge AI: Processing at the Source

Edge AI represents a fundamental shift in how we deploy artificial intelligence, moving computation from centralized cloud servers to local devices and edge nodes.

## What is Edge AI?

Edge AI combines edge computing with artificial intelligence, enabling real-time data processing and decision-making at or near the source of data generation.

## Advantages of Edge AI

### Reduced Latency
Processing data locally eliminates network delays, crucial for real-time applications like autonomous vehicles and industrial automation.

### Enhanced Privacy
Sensitive data can be processed locally without transmission to external servers, addressing privacy concerns.

### Improved Reliability
Local processing reduces dependence on network connectivity, ensuring continuous operation.

## Applications

- **Smart Cities**: Traffic optimization and public safety
- **Healthcare**: Real-time patient monitoring
- **Manufacturing**: Predictive maintenance and quality control
- **Retail**: Personalized shopping experiences

## Challenges

Hardware limitations, model optimization, and deployment complexity remain significant hurdles in edge AI adoption.

## The Future

As edge hardware becomes more powerful and AI models more efficient, we'll see an explosion of intelligent edge applications transforming industries.
    `,
    category: 'Edge Computing',
    author: 'Lisa Wang',
    publishedAt: '2024-01-08',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop',
  },
  {
    id: '5',
    title: 'Sustainable AI: Reducing the Carbon Footprint',
    excerpt: 'Exploring strategies to make artificial intelligence more environmentally sustainable while maintaining performance and innovation.',
    content: `
# Sustainable AI: Reducing the Carbon Footprint

As AI models grow larger and more complex, their environmental impact has become a critical concern. The AI community is actively developing strategies to reduce energy consumption and carbon emissions.

## The Environmental Challenge

Training large language models can consume as much energy as hundreds of homes use in a year, contributing significantly to carbon emissions.

## Sustainable AI Strategies

### Model Efficiency
- Pruning and quantization techniques
- Knowledge distillation
- Efficient architectures

### Green Computing
- Renewable energy for data centers
- Optimized hardware design
- Smart scheduling algorithms

### Lifecycle Thinking
- Model reuse and transfer learning
- Collaborative training initiatives
- Carbon footprint tracking

## Industry Initiatives

Major tech companies are committing to carbon neutrality and investing in sustainable AI research, setting new standards for responsible AI development.

## The Path Forward

Balancing AI advancement with environmental responsibility requires continued innovation in efficient algorithms, sustainable infrastructure, and industry-wide collaboration.
    `,
    category: 'Sustainability',
    author: 'Dr. Emma Thompson',
    publishedAt: '2024-01-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=450&fit=crop',
  },
  {
    id: '6',
    title: 'Biocomputing: The Convergence of Biology and Technology',
    excerpt: 'DNA storage, biological neural networks, and living computers are opening new frontiers in computational paradigms.',
    content: `
# Biocomputing: The Convergence of Biology and Technology

Biocomputing represents a revolutionary approach to computation, leveraging biological systems and processes to perform computational tasks with unprecedented efficiency and capabilities.

## What is Biocomputing?

Biocomputing encompasses various approaches that use biological materials, processes, or principles for computational purposes.

## Key Areas

### DNA Computing
Using DNA molecules as a storage and processing medium, offering massive parallelism and incredible storage density.

### Biological Neural Networks
Creating hybrid systems that combine biological neurons with electronic components for enhanced learning and adaptation.

### Molecular Computing
Utilizing proteins, enzymes, and other biomolecules to perform calculations and logical operations.

## Advantages

- **Massive Parallelism**: Billions of operations simultaneously
- **Energy Efficiency**: Natural processes optimized over millions of years
- **Self-Assembly**: Automatic organization and repair capabilities
- **Biocompatibility**: Integration with living systems

## Applications

- Medical diagnostics and treatment
- Environmental monitoring
- Cryptography and security
- Advanced materials design

## Future Prospects

Biocomputing could lead to computers that grow rather than being manufactured, process information like living organisms, and seamlessly integrate with biological systems.
    `,
    category: 'Biotech',
    author: 'Dr. James Martinez',
    publishedAt: '2024-01-03',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=450&fit=crop',
  },
];

export const categories = [
  'AI & Machine Learning',
  'Quantum Computing',
  'Deep Learning',
  'Edge Computing',
  'Sustainability',
  'Biotech',
  'Robotics',
  'Cybersecurity',
  'Blockchain',
  'Future Tech',
];

export const getFeaturedPosts = () => mockPosts.filter(post => post.featured);
export const getRecentPosts = (limit = 6) => mockPosts.slice(0, limit);
export const getPostsByCategory = (category: string) => 
  mockPosts.filter(post => post.category === category);
export const getPostById = (id: string) => mockPosts.find(post => post.id === id);
