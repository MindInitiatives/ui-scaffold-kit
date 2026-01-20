"use client";

import { useSettingsStore } from "@/store/settings.store";

export default function RedisConfigForm() {
  const { redisConfig, setRedisConfig } = useSettingsStore();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 mb-6 space-y-4">
      <h3 className="text-lg font-semibold">Redis Configuration</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Host"
          value={redisConfig.host}
          onChange={(e) =>
            setRedisConfig({ ...redisConfig, host: e.target.value })
          }
          className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Port"
          value={redisConfig.port}
          onChange={(e) =>
            setRedisConfig({ ...redisConfig, port: Number(e.target.value) })
          }
          className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <input
        type="password"
        placeholder="Password"
        value={redisConfig.password}
        onChange={(e) =>
          setRedisConfig({ ...redisConfig, password: e.target.value })
        }
        className="mt-4 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </section>
  );
}
