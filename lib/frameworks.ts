import { IconType } from "react-icons";
import { SiReact, SiAngular } from "react-icons/si";

interface FrameworkOptions {
  id: string;
  label: string;
  type: string;
}

export interface Framework {
  id: string,
  name: string,
  icon: IconType,
  options: FrameworkOptions[],
}

export const frameworks: Framework[] = [
  {
    id: "react",
    name: "React",
    icon: SiReact,
    options: [
      { id: "tailwind", label: "Tailwind CSS", type: "checkbox" },
      { id: "mui", label: "MUI", type: "checkbox" },
    ],
  },
  {
    id: "angular",
    name: "Angular",
    icon: SiAngular,
    options: [
      { id: "ngrx", label: "NgRx", type: "checkbox" },
      { id: "material", label: "Angular Material", type: "checkbox" },
    ],
  },
];
