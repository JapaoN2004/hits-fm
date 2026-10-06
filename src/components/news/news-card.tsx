import { Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NewsPost } from "@/data/types";
import { formatDate } from "@/lib/news";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/noticias/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md"
    >
      <div className="bg-surface-3 text-subtle relative grid aspect-video place-items-center">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <Newspaper className="size-10" aria-hidden />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-sm">
          <Badge tone="primary">{post.category}</Badge>
          <time dateTime={post.publishedAt} className="text-subtle">
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="group-hover:text-primary text-lg leading-snug font-bold">{post.title}</h3>
      </div>
    </Link>
  );
}
