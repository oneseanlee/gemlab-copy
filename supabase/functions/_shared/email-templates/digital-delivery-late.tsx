/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface DigitalDeliveryLateEmailProps {
  firstName: string
}

const GUIDES = [
  {
    title: "The Ultimate GLP-1 User's Master Guide",
    description: "Your complete roadmap to maximizing GLP-1 support — protocols, dosing insights, and optimization strategies.",
    onlineUrl: "https://report.cell365power.com/glp1-users-master-guide",
    pdfUrl: "https://drive.google.com/file/d/18KY8qZAckoJ47LIucUIWJwJLYTpE2S_J/view?usp=drive_link",
  },
  {
    title: "10-Minute Easy Lymphatic Morning Jumpstart System",
    description: "A simple daily ritual to activate your lymphatic system and amplify detox pathways in just 10 minutes.",
    onlineUrl: "https://report.cell365power.com/10-min-lymphatic-jumpstart",
    pdfUrl: "https://drive.google.com/file/d/1RSqzePsLQyaeJw-YTlAa7x4YNzdXvChK/view?usp=sharing",
  },
  {
    title: "Maximize Your Results: The Smart Science of Enhanced Absorption",
    description: "Science-backed techniques to dramatically improve nutrient absorption and get the most from every supplement.",
    onlineUrl: "https://report.cell365power.com/maximize-your-results",
    pdfUrl: "https://drive.google.com/file/d/1PdA2zg6drw9aYANokFQEP7dsNIBpuFm_/view?usp=drive_link",
  },
]

const COMMUNITY_URL = "https://www.skool.com/best-365-labs-community-7298/about"

export const DigitalDeliveryLateEmail = ({
  firstName = "there",
}: DigitalDeliveryLateEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your bonus digital guides and community access are here — access them now</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo */}
        <Img
          src="https://cell365power.lovable.app/images/best365labs-logo.png"
          alt="Best 365 Labs"
          width={160}
          height={40}
          style={logo}
        />

        {/* Heading */}
        <Heading style={h1}>Your Bonus Digital Guides Are Here 📚</Heading>

        <Text style={text}>
          Hey {firstName}, thank you for being a valued Best 365 Labs customer!
          We wanted to make sure you received the bonus digital guides and
          community access that came with your GLP-1 Protocol purchase.
        </Text>

        <Text style={text}>
          Everything is ready for you below — just click to read online or
          download the PDFs.
        </Text>

        {/* Guides */}
        {GUIDES.map((guide, i) => (
          <Section key={i} style={guideSection}>
            <Heading as="h2" style={h2}>
              {guide.title}
            </Heading>
            <Text style={guideDescription}>{guide.description}</Text>
            <table cellPadding={0} cellSpacing={0} role="presentation">
              <tr>
                <td style={{ paddingRight: "12px" }}>
                  <Button style={primaryButton} href={guide.onlineUrl}>
                    Read Online
                  </Button>
                </td>
                <td>
                  <Button style={secondaryButton} href={guide.pdfUrl}>
                    Download PDF
                  </Button>
                </td>
              </tr>
            </table>
          </Section>
        ))}

        <Hr style={divider} />

        {/* Community */}
        <Section style={guideSection}>
          <Heading as="h2" style={h2}>
            Best365 Labs Community Access
          </Heading>
          <Text style={guideDescription}>
            Connect with thousands of like-minded individuals on the same
            journey. Get exclusive tips, live Q&As, and direct access to our
            expert team.
          </Text>
          <Button style={communityButton} href={COMMUNITY_URL}>
            Join the Community
          </Button>
        </Section>

        <Hr style={divider} />

        {/* Footer */}
        <Text style={footer}>
          Questions? Reply to this email or visit{" "}
          <Link href="https://cell365power.com" style={link}>
            cell365power.com
          </Link>
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Best 365 Labs. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default DigitalDeliveryLateEmail

/* ─── Styles ─── */

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
}

const container = { padding: "32px 28px" }

const logo = { marginBottom: "28px" }

const h1 = {
  fontSize: "26px",
  fontWeight: "bold" as const,
  color: "#0A1628",
  margin: "0 0 20px",
  fontFamily: "'Playfair Display', Georgia, serif",
}

const h2 = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#0A1628",
  margin: "0 0 8px",
  fontFamily: "'Playfair Display', Georgia, serif",
}

const text = {
  fontSize: "15px",
  color: "#5A6578",
  lineHeight: "1.6",
  margin: "0 0 24px",
}

const guideSection = {
  margin: "0 0 28px",
}

const guideDescription = {
  fontSize: "14px",
  color: "#5A6578",
  lineHeight: "1.5",
  margin: "0 0 16px",
}

const primaryButton = {
  backgroundColor: "#3376b0",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600" as const,
  borderRadius: "8px",
  padding: "12px 20px",
  textDecoration: "none",
}

const secondaryButton = {
  backgroundColor: "#ffffff",
  color: "#3376b0",
  fontSize: "14px",
  fontWeight: "600" as const,
  borderRadius: "8px",
  padding: "12px 20px",
  textDecoration: "none",
  border: "2px solid #3376b0",
}

const communityButton = {
  backgroundColor: "#0A1628",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600" as const,
  borderRadius: "8px",
  padding: "14px 24px",
  textDecoration: "none",
}

const divider = {
  borderColor: "#E5E7EB",
  margin: "8px 0 28px",
}

const link = { color: "#3376b0", textDecoration: "underline" }

const footer = {
  fontSize: "12px",
  color: "#9CA3AF",
  margin: "8px 0 0",
}
