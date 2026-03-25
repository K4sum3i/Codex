import {
  Home,
  LayoutTemplate,
  Setting06FreeIcons,
  Trash,
} from "@hugeicons/core-free-icons";

export const data = {
  user: {
    name: "Shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Setting06FreeIcons,
    },
  ],
};
