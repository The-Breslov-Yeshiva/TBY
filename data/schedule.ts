export type ScheduleDay = {
  id: string;
  name: string;
};

export type ScheduleEvent = {
  day: string;
  time: string;
  title: string;
  instructor: string;
  category: "Morning Seder" | "Afternoon Seder" | "Personal Growth";
  description: string;
};

export const scheduleDays: ScheduleDay[] = [
  { id: "sun", name: "Sunday" },
  { id: "mon", name: "Monday" },
  { id: "tue", name: "Tuesday" },
  { id: "wed", name: "Wednesday" },
  { id: "thu", name: "Thursday" }
];

export const categoryStyles = {
  "Morning Seder": { text: "text-amber-300", bg: "bg-amber-500", dot: "bg-amber-400" },
  "Afternoon Seder": { text: "text-indigo-300", bg: "bg-indigo-500", dot: "bg-indigo-400" },
  "Personal Growth": { text: "text-purple-300", bg: "bg-purple-500", dot: "bg-purple-400" }
} as const;

export const scheduleEvents: ScheduleEvent[] = [
  { day: "sun", time: "9:30 AM - 9:50 AM", title: "Mesillas Yesharim", instructor: "R' Yehudah Kastel", category: "Morning Seder", description: "A systematic approach to ethical and spiritual development based on the Ramchal's path of the just." },
  { day: "sun", time: "10:00 AM - 12:00 PM", title: "Gemara & Halacha", instructor: "R' Sholom Brown", category: "Morning Seder", description: "Rigorous analysis of sugyos with a focus on practical application in daily Jewish law." },
  { day: "sun", time: "2:00 PM - 3:00 PM", title: "Awakening", instructor: "R' Yehudah Kastel", category: "Afternoon Seder", description: "Chassidic concepts that trigger genuine internal awakening and motivation." },
  { day: "sun", time: "3:00 PM - 4:00 PM", title: "Supervised Learning", instructor: "Staff", category: "Personal Growth", description: "Independent study with senior staff available for guidance." },
  { day: "sun", time: "4:00 PM - 5:00 PM", title: "Likutei Moharan", instructor: "R' Dovid Kalmus", category: "Afternoon Seder", description: "In-depth exploration of Rebbe Nachman's primary teachings." },
  { day: "mon", time: "9:30 AM - 9:50 AM", title: "Mesillas Yesharim", instructor: "R' Yehudah Kastel", category: "Morning Seder", description: "Ethical refinement as the foundation for all spiritual achievement." },
  { day: "mon", time: "10:00 AM - 12:00 PM", title: "Gemara & Halacha", instructor: "R' Sholom Brown", category: "Morning Seder", description: "Developing clarity in Gemara and Halacha." },
  { day: "mon", time: "2:00 PM - 3:00 PM", title: "Uvacharta B'Chaim", instructor: "R' Yehoshua Gerzi", category: "Afternoon Seder", description: "Cognitive and emotional pathways to choosing life and vitality." },
  { day: "mon", time: "3:00 PM - 4:00 PM", title: "Tefillah Workshop", instructor: "R' Yehudah Kastel", category: "Afternoon Seder", description: "Transforming daily prayer into a living connection." },
  { day: "mon", time: "4:00 PM - 5:00 PM", title: "Supervised Learning", instructor: "Staff", category: "Personal Growth", description: "Building independent learning strength." },
  { day: "tue", time: "9:30 AM - 9:50 AM", title: "Mesillas Yesharim", instructor: "R' Yehudah Kastel", category: "Morning Seder", description: "Progressing through the levels of spiritual purity." },
  { day: "tue", time: "10:00 AM - 12:00 PM", title: "Gemara & Halacha", instructor: "R' Sholom Brown", category: "Morning Seder", description: "Developing clarity in the depth of the sugya." },
  { day: "tue", time: "2:00 PM - 3:00 PM", title: "Awakening", instructor: "R' Yehudah Kastel", category: "Afternoon Seder", description: "The mechanics of spiritual inspiration." },
  { day: "tue", time: "3:00 PM - 4:00 PM", title: "Supervised Learning", instructor: "Staff", category: "Personal Growth", description: "Personalized curriculum support." },
  { day: "tue", time: "4:00 PM - 5:00 PM", title: "Likutei Moharan", instructor: "R' Dovid Kalmus", category: "Afternoon Seder", description: "Rebbe Nachman's path to joy and resilience." },
  { day: "wed", time: "9:30 AM - 9:50 AM", title: "Mesillas Yesharim", instructor: "R' Yehudah Kastel", category: "Morning Seder", description: "Aligning action with intention." },
  { day: "wed", time: "10:00 AM - 12:00 PM", title: "Gemara & Halacha", instructor: "R' Sholom Brown", category: "Morning Seder", description: "Synthesizing Talmudic concepts." },
  { day: "wed", time: "2:00 PM - 3:00 PM", title: "Uvacharta B'Chaim", instructor: "R' Yehoshua Gerzi", category: "Afternoon Seder", description: "Living with vitality and purpose." },
  { day: "wed", time: "3:00 PM - 4:00 PM", title: "Tefillah Workshop", instructor: "R' Yehudah Kastel", category: "Afternoon Seder", description: "The inner power of the siddur." },
  { day: "wed", time: "4:00 PM - 5:00 PM", title: "Supervised Learning", instructor: "Staff", category: "Personal Growth", description: "Mastering the text." },
  { day: "thu", time: "9:30 AM - 9:50 AM", title: "Mesillas Yesharim", instructor: "R' Yehudah Kastel", category: "Morning Seder", description: "The peak of spiritual refinement." },
  { day: "thu", time: "10:00 AM - 12:00 PM", title: "Gemara & Halacha", instructor: "R' Sholom Brown", category: "Morning Seder", description: "Finalizing the week's sugyos." },
  { day: "thu", time: "2:00 PM - 3:00 PM", title: "Awakening", instructor: "R' Yehudah Kastel", category: "Afternoon Seder", description: "Internalizing the week's growth." },
  { day: "thu", time: "3:00 PM - 4:00 PM", title: "Supervised Learning", instructor: "Staff", category: "Personal Growth", description: "Review and integration." },
  { day: "thu", time: "4:00 PM - 5:00 PM", title: "Likutei Moharan", instructor: "R' Dovid Kalmus", category: "Afternoon Seder", description: "Rebbe Nachman's light for the weekend ahead." }
];

export function getEventsForDay(dayId: string) {
  return scheduleEvents.filter((event) => event.day === dayId);
}

export function getJerusalemDayId(date = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    weekday: "long"
  }).format(date);

  const dayMap: Record<string, string> = {
    sunday: "sun",
    monday: "mon",
    tuesday: "tue",
    wednesday: "wed",
    thursday: "thu",
    friday: "fri",
    saturday: "sat"
  };

  return dayMap[weekday.toLowerCase()] || "sun";
}

export function getTodaySummary(date = new Date()) {
  const dayId = getJerusalemDayId(date);
  const regularDay = scheduleDays.find((day) => day.id === dayId);
  const events = regularDay ? getEventsForDay(dayId) : [];
  const nextRegularDay = scheduleDays[(scheduleDays.findIndex((day) => day.id === dayId) + 1 + scheduleDays.length) % scheduleDays.length] || scheduleDays[0];

  return {
    dayId,
    dayName: regularDay?.name || (dayId === "sat" ? "Shabbos" : "Friday"),
    events,
    hasRegularSchedule: events.length > 0,
    nextRegularDay
  };
}
