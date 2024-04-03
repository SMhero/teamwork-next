export default function Footer() {
  const copyright = `Teamwork© ${new Date("2021").getFullYear()} - ${new Date().getFullYear()}`;
  return (
    <footer className="w-full h-4">
      <div className="px-6 py-4 max-w-screen-xl m-auto box-border">
        <span>{copyright}</span>
      </div>
    </footer>
  );
}
