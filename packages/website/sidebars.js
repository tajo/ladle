module.exports = {
  someSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsible: false,
      items: ["introduction", "setup", "stories"],
    },
    {
      type: "category",
      label: "Features",
      items: ["css", "providers", "meta", "visual-snapshots"],
    },
    {
      type: "category",
      label: "Addons",
      items: ["addons", "a11y", "links", "source", "width"],
    },
    {
      type: "category",
      label: "Configuration",
      items: ["cli", "config", "programmatic"],
    },
    {
      type: "category",
      label: "Help",
      items: [
        "troubleshooting",
        {
          type: "link",
          label: "Contributing",
          href: "https://github.com/tajo/ladle/blob/master/CONTRIBUTING.md",
        },
      ],
    },
  ],
};
