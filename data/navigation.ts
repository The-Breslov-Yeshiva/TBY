import {
  CalendarDays,
  Camera,
  Compass,
  FileText,
  GraduationCap,
  Home,
  Mail,
  Newspaper,
  Users
} from "lucide-react";

export const primaryNavigation = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Users },
  { label: "Schedule", href: "/schedule", icon: CalendarDays },
  { label: "Contact", href: "/contact", icon: Mail }
] as const;

export const communityNavigation = [
  { label: "Vision", href: "/vision", icon: Compass },
  { label: "Gallery", href: "/gallery", icon: Camera },
  { label: "Alumni", href: "/alumni", icon: GraduationCap },
  { label: "Newsletter", href: "/newsletter", icon: Newspaper },
  { label: "Application", href: "/form", icon: FileText }
] as const;

export const legalNavigation = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" }
] as const;
