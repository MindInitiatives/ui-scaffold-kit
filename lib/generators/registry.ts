import reactGenerator from "./react";
import angularGenerator from "./angular";

export const frameworkRegistry: Record<string, typeof reactGenerator> = {
  react: reactGenerator,
  angular: angularGenerator,
};
