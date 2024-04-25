import SettingsForm from "@/modules/forms/SettingsForm";

export default function Settings() {
  return (
    <section className="m-auto max-w-sm">
      <h1 className="text-4xl text-center mb-6">Profile settings</h1>
      <SettingsForm />
    </section>
  );
}
