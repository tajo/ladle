module.exports = {
  someSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsible: false,
      items: ["introduction", "setup", "stories", "decorators"],
    },
    {
      type: "category",
      label: "Features",
      items: ["css", "providers", "meta", "typescript", "visual-snapshots"],
    },
    {
      type: "category",
      label: "Addons",
      items: [
        "addons",
        "a11y",
        "actions",
        "controls",
        "links",
        "source",
        "width",
      ],
    },
    {
      type: "category",
      label: "Recipes",
      items: ["nextjs"],
    },
    {
      type: "category",
      label: "Configuration",
      items: ["cli", "config", "programmatic", "swc"],
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
