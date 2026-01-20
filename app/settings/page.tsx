import AIProviderForm from "@/components/settings/AIProviderForm";
import ApiKeyForm from "@/components/settings/ApiKeyForm";
// import RedisConfigForm from "@/components/settings/RedisConfigForm";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-12 space-y-6">
      <h2 className="mb-6 text-2xl font-semibold text-center">Settings</h2>

      <AIProviderForm />
      <ApiKeyForm />
      {/* <RedisConfigForm /> */}
    </main>
  );
}
