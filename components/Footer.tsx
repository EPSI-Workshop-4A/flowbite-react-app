import {Footer as FlowbiteFooter, FooterCopyright, FooterLinkGroup, FooterLink} from 'flowbite-react';

export default async function Footer() {
  return (
    <FlowbiteFooter container>
      <FooterCopyright href="/" by="GénéaSanté" year={2024} />
      <FooterLinkGroup>
        <FooterLink href="#">Mention Légale</FooterLink>
        <FooterLink href="pdp">Protection des données</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </FlowbiteFooter>
  );
};
