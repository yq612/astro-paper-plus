import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";
import Readtime from "./ReadTime";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description, readingTime } = frontmatter;
  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="text-lg font-medium decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="text-lg font-medium decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <div className="mb-[0.7rem] flex flex-wrap items-center items-center sm:mb-[0] sm:flex-nowrap">
        <Datetime datetime={pubDatetime} size="lg" className="my-2" />
        &nbsp;&nbsp;&nbsp;
        <Readtime size="lg" time={readingTime} />
      </div>
      <p>{description}</p>
    </li>
  );
}
