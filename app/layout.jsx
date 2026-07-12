import "./globals.css";

export const metadata = {
  title: "DriveInspect Buchhaltung",
  description: "Buchhaltungs-, Rechnungs- und Workflow-System für Kfz-Sachverständige"
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
