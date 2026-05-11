"use client";

import { ExternalLink, GitBranch, Mail, Phone } from "lucide-react";
import { contact, contentAssets } from "@/data/portfolioData";
import { GlassCard } from "./GlassCard";

type ContactCardProps = {
  linkedin: string;
  github: string;
};

export function ContactCard({ linkedin, github }: ContactCardProps) {
  return (
    <GlassCard tone="dark" className="mx-auto w-full max-w-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <a className="contact-line" href={`mailto:${contact.email}`}>
          <Mail size={19} aria-hidden="true" />
          <span>{contact.email}</span>
        </a>
        <a className="contact-line" href={`tel:${contact.phone}`}>
          <Phone size={19} aria-hidden="true" />
          <span>{contact.phone}</span>
        </a>
        <a
          className="contact-line"
          href={linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={19} aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <a
          className="contact-line"
          href={github}
          target="_blank"
          rel="noreferrer"
        >
          <GitBranch size={19} aria-hidden="true" />
          <span>GitHub</span>
        </a>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a className="button button-light" href={`mailto:${contact.email}`}>
          <Mail size={18} aria-hidden="true" />
          Email Me
        </a>
        <a
          className="button button-light"
          href={linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={18} aria-hidden="true" />
          LinkedIn
        </a>
        <a
          className="button button-light"
          href={github}
          target="_blank"
          rel="noreferrer"
        >
          <GitBranch size={18} aria-hidden="true" />
          GitHub
        </a>
        <a
          className="button button-light"
          href={contentAssets.documents.resume}
          download
        >
          Download Resume
        </a>
      </div>
    </GlassCard>
  );
}
