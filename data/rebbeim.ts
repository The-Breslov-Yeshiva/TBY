export type Rabbi = {
  name: string;
  role: string;
  image: string;
  bio: string;
  focus?: string;
};

export const rabbeim: Rabbi[] = [
  {
    name: "Rabbi Berel Simpser",
    role: "Rosh Yeshiva",
    image: "/simpser-new.png",
    focus: "scale-125 object-[50%_14%]",
    bio: "Rabbi Simpser brings steady mentorship and a grounded presence to the yeshiva environment."
  },
  {
    name: "Rabbi Yehoshua Gerzi",
    role: "Rosh Yeshiva",
    image: "/gerzi.png",
    bio: "Rabbi Gerzi helps students connect inner work, emotional health, and practical avodas Hashem."
  },
  {
    name: "Rabbi Dovid Yisroel Kalmus",
    role: "Rosh Yeshiva",
    image: "/kalmus-new.png",
    bio: "Rabbi Kalmus brings Rebbe Nachman's teachings into daily life with depth, sensitivity, and accessible language."
  },
  {
    name: "Rabbi Yehuda Kastel",
    role: "Mashgiach",
    image: "/yehuda-kastel-new.png",
    focus: "scale-125 object-[50%_10%]",
    bio: "Rabbi Kastel leads the yeshiva with warmth, clarity, and a deep commitment to helping each talmid build an honest relationship with Torah and avodas Hashem."
  },
  {
    name: "Rabbi Nissim Black",
    role: "Guest Shiurim & Chizuk",
    image: "/nissim-black-new.png",
    focus: "scale-110 object-top",
    bio: "Rabbi Black shares lived inspiration, personal growth, and the language of choosing life with strength and joy."
  },
  {
    name: "Rabbi Sholom Brown",
    role: "Gemara & Halacha",
    image: "/sholom-brown.png",
    focus: "scale-125 object-[50%_12%]",
    bio: "Rabbi Brown guides talmidim through serious learning with practical clarity, patient instruction, and a focus on building independent skills."
  }
];
