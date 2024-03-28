import LoginForm from "@/modules/forms/LoginForm";

export default function Home() {
  return (
    <div>
      <div className="flex-1 max-w-sm">
        <h1 className="text-4xl text-center mb-6">Teamwork - Die hard!</h1>
        <LoginForm />
      </div>
    </div>
  );
}
