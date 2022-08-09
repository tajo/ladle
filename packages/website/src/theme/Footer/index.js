/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";

function Footer() {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  const { copyright, links, logo, style } = footer;
  return (
    <>
      <p
        style={{
          backgroundColor: "var(--ifm-footer-background-color)",
          color: "var(--ifm-footer-color)",
          padding: "16px",
          margin: "32px auto",
          maxWidth: "630px",
          textAlign: "center",
          borderRadius: "16px",
        }}
      >
        Do you want to work on Ladle and other web tooling? Our team at Uber is{" "}
        <a href="https://www.uber.com/global/en/careers/list/108900/">hiring</a>
        !
      </p>
      <FooterLayout
        style={style}
        links={links && links.length > 0 && <FooterLinks links={links} />}
        logo={logo && <FooterLogo logo={logo} />}
        copyright={copyright && <FooterCopyright copyright={copyright} />}
      />
    </>
  );
}

export default React.memo(Footer);
