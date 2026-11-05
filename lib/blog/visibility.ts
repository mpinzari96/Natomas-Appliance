import type { BlogPost, PublishedBlogPost, RuntimeEnv } from "./types"

export function readRuntimeEnv(source?: RuntimeEnv): RuntimeEnv {
  return {
    NODE_ENV: source?.NODE_ENV ?? process.env.NODE_ENV,
    VERCEL_ENV: source?.VERCEL_ENV ?? process.env.VERCEL_ENV,
  }
}

export function isUnpublishedPreviewAllowed(env: RuntimeEnv = readRuntimeEnv()): boolean {
  if (env.VERCEL_ENV === "production") {
    return false
  }
  if (env.VERCEL_ENV === "preview") {
    return true
  }
  return env.NODE_ENV !== "production"
}

export function isPublishedPost(post: BlogPost): post is PublishedBlogPost {
  return post.status === "published"
}

export function isPostVisible(post: BlogPost, env: RuntimeEnv = readRuntimeEnv()): boolean {
  if (isPublishedPost(post)) {
    return true
  }
  return isUnpublishedPreviewAllowed(env)
}

export function visiblePosts(posts: BlogPost[], env: RuntimeEnv = readRuntimeEnv()): BlogPost[] {
  return posts.filter((post) => isPostVisible(post, env))
}

export function findVisiblePost(
  posts: BlogPost[],
  slug: string,
  env: RuntimeEnv = readRuntimeEnv(),
): BlogPost | undefined {
  return visiblePosts(posts, env).find((post) => post.slug === slug)
}
