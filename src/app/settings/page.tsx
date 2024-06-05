import { getProfile } from "@/actions/profile/get";
import SettingsForm from "@/modules/forms/SettingsForm";

export default async function Settings() {
  const profile = await getProfile();

  if (!profile) {
    throw Error("Profile is not loaded");
  }

  return (
    <section className="m-auto max-w-sm">
      <h1 className="text-4xl text-center mb-6">Profile settings</h1>
      <SettingsForm profile={profile} />
    </section>
  );
}
