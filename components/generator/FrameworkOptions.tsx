"use client";

import { frameworks } from '@/lib/frameworks';
import { useGeneratorStore } from '@/store/generator.store';
import MultiSelectTagInput from './MultiSelectTagInput';


export default function FrameworkOptions() {
  const { config, updateConfig } = useGeneratorStore();

  const fw = frameworks.find((f) => f.id === config.framework.id);
  if (!fw?.options) return null;

  return (
    <MultiSelectTagInput
      options={fw.options}
      value={config.frameworkOptions || []}
      onChange={(values) =>
        updateConfig({ frameworkOptions: values })
      }
    />
  );
}
