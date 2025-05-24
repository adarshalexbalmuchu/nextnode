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

export const blogPosts: BlogPost[] = [];
