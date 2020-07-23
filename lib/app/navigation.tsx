import React from "react";
import history from "./history";
// @ts-ignore
import { stories } from "./list";

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      history.push(href);
    }}
  >
    {children}
  </a>
);

const Navigation: React.FC = () => (
  <ul>
    {Object.keys(stories).map((id) => (
      <li key={id}>
        <Link href={`?path=${id}`}>{id}</Link>
      </li>
    ))}
  </ul>
);

export default Navigation;
