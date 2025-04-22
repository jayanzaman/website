// src/components/Footer.jsx or .tsx (use the correct extension)
export default function Footer() {
    // Copy your original footer code here
    return (
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Jayan Zaman. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  