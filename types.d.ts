interface AlpinePersistHandle<T> {
  as(key: string): T;
}

interface Window {
  Alpine: {
    $persist<T>(value: T): AlpinePersistHandle<T>;
    store(name: string, value: unknown): void;
  };
  isActive(path: string): boolean;
  TBYSchedule: {
    days: readonly TBYScheduleDay[];
    categoryStyles: Record<string, TBYScheduleCategoryStyle>;
    events: readonly TBYScheduleEvent[];
    getEventsForDay(dayId: string): TBYScheduleEvent[];
    getTodaySummary(date?: Date): TBYScheduleSummary;
  };
}

interface TBYScheduleDay {
  id: string;
  name: string;
}

interface TBYScheduleCategoryStyle {
  text: string;
  bg: string;
  dot: string;
}

interface TBYScheduleEvent {
  day: string;
  time: string;
  title: string;
  instructor: string;
  category: string;
  description: string;
}

interface TBYScheduleSummary {
  dayId: string;
  dayName: string;
  events: TBYScheduleEvent[];
  hasRegularSchedule: boolean;
  nextRegularDay: TBYScheduleDay;
}
