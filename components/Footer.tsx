"use client"

import {Footer as FlowbiteFooter} from 'flowbite-react';

export default async function Footer() {
  return (
    <FlowbiteFooter container>
      <FlowbiteFooter.Copyright href="#" by="Flowbite™" year={2022} />
      <FlowbiteFooter.LinkGroup>
        <FlowbiteFooter.Link href="#">Mention Légale</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="pdp">Privacy Policy</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Licensing</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
      </FlowbiteFooter.LinkGroup>
    </FlowbiteFooter>
  );
};