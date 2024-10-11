"use client"

import {Footer as FlowbiteFooter} from 'flowbite-react';

export default async function Footer() {
  return (
    <FlowbiteFooter container>
      <FlowbiteFooter.Copyright href="/" by="GénéaSanté" year={2024} />
      <FlowbiteFooter.LinkGroup>
        <FlowbiteFooter.Link href="#">Mention Légale</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="pdp">Protection des données</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Licensing</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
      </FlowbiteFooter.LinkGroup>
    </FlowbiteFooter>
  );
};
