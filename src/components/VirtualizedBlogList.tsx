import React, { FC, useMemo, memo } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import BlogCard from './BlogCard';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  created_at: string;
  read_time: number | null;
  difficulty_level: string | null;
  featured: boolean | null;
  categories?: {
    name: string;
    color: string;
  } | null;
}

interface VirtualizedBlogListProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

interface ListItemData {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

type ListItemProps = ListChildComponentProps<ListItemData>;

// Memoized list item for performance
const ListItem: FC<ListItemProps> = memo(({ index, style, data }) => {
  const { posts, onPostClick } = data;
  const post = posts[index];

  if (!post) return null;

  return (
    <div style={style} className="px-2 py-2">
      <BlogCard
        key={post.id}
        title={post.title}
        excerpt={post.excerpt || ''}
        readTime={`${post.read_time || 5} min`}
        difficulty={
          (post.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced') || 'Intermediate'
        }
        tags={post.categories ? [post.categories.name] : []}
        date={post.created_at}
        isRead={false}
        progress={0}
        slug={post.slug}
      />
    </div>
  );
});

// Optimize list component with memo
const VirtualizedBlogList: FC<VirtualizedBlogListProps> = memo(
  ({ posts, onPostClick = () => {} }) => {
    const itemData: ListItemData = useMemo(
      () => ({
        posts,
        onPostClick,
      }),
      [posts, onPostClick]
    );

    if (!posts.length) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found</p>
        </div>
      );
    }

    return (
      <div className="w-full">
        <List
          width="100%"
          height={600}
          itemCount={posts.length}
          itemSize={300}
          itemData={itemData}
          overscanCount={5}
        >
          {ListItem}
        </List>
      </div>
    );
  }
);

VirtualizedBlogList.displayName = 'VirtualizedBlogList';

export default VirtualizedBlogList;
