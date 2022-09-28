import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "🤝 Works with your existing tools",
    description: (
      <>
        Ladle is compatible with the{" "}
        <b>
          <a href="https://github.com/ComponentDriven/csf">
            Component Story Format
          </a>
        </b>{" "}
        and{" "}
        <b>
          <a href="https://storybook.js.org/docs/react/essentials/controls">
            Controls
          </a>
        </b>
        . It supports links, themes, right-to-left, source code, a11y (axe),
        typescript and flow out of the box.
      </>
    ),
  },
  {
    title: "⚡ Fast, Accessible and Small",
    description: (
      <>
        Powered by{" "}
        <b>
          <a href="https://vitejs.dev/">Vite</a>
        </b>
        , using <a href="https://esbuild.github.io/">esbuild</a>, embracing ES
        modules and code-splitting with HMR/Fast Refresh for each story.
      </>
    ),
  },
  {
    title: "🛠️ Zero Configuration",
    description: (
      <>
        No configuration needed but still customizable. Ladle is a single
        dependency and command. Batteries included.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={`${siteConfig.title}`} description="Ladle documentation">
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            <img src="/img/logo.svg" alt="Ladle Logo" className="main-logo" />
            {siteConfig.title}
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div style={{ maxWidth: "660px", width: "100%", margin: "0px auto" }}>
            <img src="/img/ladle-baseweb.png" alt="Ladle Environment" />
          </div>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to="https://baseweb.design/ladle"
            >
              Demo
            </Link>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to="https://ladle.dev/new"
            >
              StackBlitz
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
