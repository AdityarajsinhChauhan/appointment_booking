// src/utils/sidebarConfig.js

import {
  ChartColumnIncreasing,
  Calendar,
  Settings,
  Users,
  Clock
} from "lucide-react";

export const sidebarMenu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["USER", "PROVIDER"],
    icon: ChartColumnIncreasing,
  },
  {
    label: "Dashboard",
    path: "/adminDashboard",
    roles: ["ADMIN"],
    icon: ChartColumnIncreasing,
  },
  {
    label: "Book Appointments",
    path: "/booking",
    roles: ["USER"],
    icon: Calendar,
  },
  {
    label: "Manage Users",
    path: "/manageProviders",
    roles: ["ADMIN"],
    icon: Users,
  },
  {
    label: "Manage Slots",
    path: "/manageSlots",
    roles: ["PROVIDER"],
    icon: Calendar,
  },
  {
    label:"Your Appointments",
    path: "/appointment",
    roles: ["USER", "PROVIDER", "ADMIN"],
    icon: Clock,
  },
  {
    label: "Profile",
    path: "/profile",
    roles: ["USER", "PROVIDER", "ADMIN"],
    icon: Settings,
  },
];