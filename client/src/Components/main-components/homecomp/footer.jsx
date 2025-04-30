import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-800 py-6 border-b border-slate-200  w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding */}
          <div>
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-green-500 w-5 h-5 mr-2" />
              <span className="font-semibold text-sm text-slate-900 tracking-wide">
                Guardian Earth
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4 text-left">
              Advanced disaster management solutions for a safer world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4 text-slate-600 hover:text-green-500 transition" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4 text-slate-600 hover:text-green-500 transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 text-slate-600 hover:text-green-500 transition" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4 text-slate-600 hover:text-green-500 transition" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-medium text-sm text-slate-900 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <a href="/solutions/flood" className="hover:text-green-500">
                  Flood Management
                </a>
              </li>
              <li>
                <a href="/solutions/fire" className="hover:text-green-500">
                  Fire Response
                </a>
              </li>
              <li>
                <a
                  href="/solutions/earthquake"
                  className="hover:text-green-500"
                >
                  Earthquake Monitoring
                </a>
              </li>
              <li>
                <a href="/solutions/hurricane" className="hover:text-green-500">
                  Hurricane Tracking
                </a>
              </li>
              <li>
                <a href="/solutions/tsunami" className="hover:text-green-500">
                  Tsunami Warning Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <a href="/about" className="hover:text-green-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/case-studies" className="hover:text-green-500">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-green-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="/partners" className="hover:text-green-500">
                  Partners
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-sm text-slate-900 mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <a href="/resources/guides" className="hover:text-green-500">
                  Emergency Guides
                </a>
              </li>
              <li>
                <a href="/resources/training" className="hover:text-green-500">
                  Training Programs
                </a>
              </li>
              <li>
                <a href="/resources/research" className="hover:text-green-500">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="/resources/webinars" className="hover:text-green-500">
                  Webinars
                </a>
              </li>
              <li>
                <a href="/resources/api" className="hover:text-green-500">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-10 pt-4 text-xs flex flex-col md:flex-row justify-between items-center text-slate-500">
          <p className="mb-2 md:mb-0">
            © 2025 Guardian Earth. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="hover:text-green-500">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-green-500">
              Terms of Service
            </a>
            <a href="/cookie-policy" className="hover:text-green-500">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
