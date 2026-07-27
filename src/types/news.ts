export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  coverImageUrl?: string;
  isPublished: boolean;
  authorId: string;
  authorName: string;
  categoryId?: string;
  categoryName?: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
