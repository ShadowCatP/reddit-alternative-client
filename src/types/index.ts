export interface RedditChild<T> {
  kind: string;
  data: T;
}

export interface RedditListing<T> {
  kind: string;
  data: {
    children: RedditChild<T>[];
    after?: string | null;
    before?: string | null;
  };
}

export interface PostData {
  id: string;
  title: string;
  author: string;
  selftext: string;
  created_utc: number;
  url: string;
  ups: number; // This number may differ to a displayed reddit ups due to fuzzing algorithm
  total_awards_received: number;
  num_comments: number;
  subreddit: string;
  name: string;
  url_overridden_by_dest?: string; // If post has any sorts of links in it
  selftext_html?: string; // For post html content
  thumbnail?: string;
}

export interface CommentData {
  id: string;
  name: string;
  author: string;
  body_html: string;
  body: string;
  created_utc: number;
  ups: number;
  link_id: string;
  replies: RedditListing<CommentData>;
}

export interface PostDetailResponse {
  data: {
    children: {
      data: PostData;
    }[];
  };
}

export interface CommentResponse {
  data: {
    children: {
      data: CommentData;
    }[];
  };
}

export interface RedditListingResponse {
  data: {
    children: {
      data: PostData;
    }[];
  };
}

export type RedditPostResponse = [PostDetailResponse, CommentResponse];
