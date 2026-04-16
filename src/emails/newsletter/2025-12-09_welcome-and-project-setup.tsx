import { NewsletterEmailLoader } from "@/features/email/delivery/newsletter-email-loader/newsletter-email-loader";

const WelcomeAndProjectSetup = () => {
  return <NewsletterEmailLoader slug="welcome-and-project-setup" />;
};

WelcomeAndProjectSetup.title = "Welcome! Let's Build a Newsletter from Scratch";

export default WelcomeAndProjectSetup;
