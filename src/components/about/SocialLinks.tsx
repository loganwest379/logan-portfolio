"use client";

import { Button, IconButton, Row, useToast } from "@once-ui-system/core";
import { person, social } from "@/resources";
import React, { useState } from "react";

export function SocialLinks() {
  const { addToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      addToast({
        variant: "success",
        message: "Email copied to clipboard",
      });
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      addToast({
        variant: "danger",
        message: "Failed to copy email",
      });
    }
  };

  return (
    <Row
      paddingTop="20"
      paddingBottom="8"
      gap="8"
      wrap
      horizontal="center"
      fitWidth
      data-border="rounded"
    >
      {social
        .filter((item) => item.essential)
        .map((item) => {
          const isEmail = item.name === "Email";
          const iconToShow = isEmail && copiedEmail ? "check" : item.icon;

          return (
            item.link && (
              <React.Fragment key={item.name}>
                <Row s={{ hide: true }}>
                  <Button
                    key={item.name}
                    href={isEmail ? undefined : item.link}
                    onClick={isEmail ? (e: React.MouseEvent) => handleEmailClick(e, person.email) : undefined}
                    prefixIcon={iconToShow}
                    label={item.name}
                    size="s"
                    weight="default"
                    variant="secondary"
                  />
                </Row>
                <Row hide s={{ hide: false }}>
                  <IconButton
                    size="l"
                    key={`${item.name}-icon`}
                    href={isEmail ? undefined : item.link}
                    onClick={isEmail ? (e: React.MouseEvent) => handleEmailClick(e, person.email) : undefined}
                    icon={iconToShow}
                    variant="secondary"
                  />
                </Row>
              </React.Fragment>
            )
          );
        })}
    </Row>
  );
}

