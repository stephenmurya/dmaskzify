export type Artist = {
  name: string;
  appleMusicUrl: string;
  image: string;
  projectLabel: string;
};

export const artists: Artist[] = [
  {
    name: "El_Sparky",
    appleMusicUrl: "https://music.apple.com/us/artist/el-sparky/1651959104",
    image: "/Artist%201.jpeg",
    projectLabel: "3 Projects",
  },
  {
    name: "JED XO",
    appleMusicUrl: "https://music.apple.com/ng/artist/jed-xo/1652142873",
    image: "/Artist%202.jpeg",
    projectLabel: "Apple Music",
  },
  {
    name: "Gneric",
    appleMusicUrl: "https://music.apple.com/ng/artist/gneric/1718413102",
    image: "/Artist%203.jpeg",
    projectLabel: "Apple Music",
  },
  {
    name: "Ánesi",
    appleMusicUrl: "https://music.apple.com/ng/artist/%C3%A1nesi/1717697631",
    image: "/Artist%204.jpeg",
    projectLabel: "Apple Music",
  },
];

export const appleMusicLinkProps = {
  target: "_blank",
  rel: "noopener",
  referrerPolicy: "origin" as const,
};
