import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KHYATI KAPADIYA Portfolio',
    description: 'Data Science & ML Enthusiast | MTech CSE Nirma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
