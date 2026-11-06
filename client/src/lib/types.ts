export type ActivityKind = "flight" | "transit" | "stay" | "sight" | "food" | "buffer";

export interface Activity {
  time: string;
  title: string;
  kind: ActivityKind;
  detail: string;
  placeId?: string;
  optional?: boolean;
  tips?: string[];
}

export interface MealNote {
  label: string;
  suggestion: string;
}

export interface DayPlan {
  id: number;
  date: string;
  iso: string;
  weekday: string;
  title: string;
  area: string;
  pace: string;
  walk: string;
  remember: string;
  summary: string;
  activities: Activity[];
  meals: MealNote[];
  tips: string[];
}

export type MarkerCategory = "station" | "hotel" | "sight" | "food";

export interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  days: number[];
  category: MarkerCategory;
  optional?: boolean;
  blurb: string;
}

export type AttractionRole = "必去" | "可選" | "備案" | "不排";

export interface Attraction {
  id: string;
  name: string;
  area: string;
  day: number;
  role: AttractionRole;
  lat: number;
  lng: number;
  admission: string;
  summary: string;
  tip: string;
}

export interface RoutePoint {
  name: string;
  lat: number;
  lng: number;
}

export interface RouteLeg {
  id: string;
  day: number;
  label: string;
  mode: "train" | "walk";
  optional?: boolean;
  points: RoutePoint[];
}

export interface TransitStep {
  title: string;
  sign?: string;
  detail: string;
}

export interface TransitPlan {
  day: number;
  heading: string;
  caution: string;
  steps: TransitStep[];
}
