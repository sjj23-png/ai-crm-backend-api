import LoginForm from "@/components/auth/LoginForm";


import LoginHero from "@/components/auth/LoginHero";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <section className="hidden bg-muted px-16 lg:flex">
        <LoginHero />
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <LoginForm />
      </section>
    </main>
  );
}