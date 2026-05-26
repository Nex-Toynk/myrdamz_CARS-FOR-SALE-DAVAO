import "./globals.css";

export const metadata = {
  title: "Myrdamz Cars for Sales Davao",
  description:
    "Luxury animated vehicle catalog for Myrdamz Cars for Sales Davao, featuring posted prices and inquiry-first browsing."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
