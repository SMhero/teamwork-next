import LoginForm from "@/modules/forms/LoginForm";

export default function Home() {
  return (
    <div className="m-auto max-w-sm">
      <h1 className="text-4xl text-center mb-6">Teamwork - Die hard!</h1>
      <LoginForm />
    </div>
  );
}
