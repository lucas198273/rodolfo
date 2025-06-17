import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="py-8 px-4 mt-10"
      style={{
        background: "linear-gradient(to right, #0a0a1a, #ffffff)",
        color: "#0a0a1a",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h2
          className="text-xl font-bold mb-4 md:mb-0"
          style={{ color: "#0a0a1a", textShadow: "1px 1px 3px rgba(59, 130, 246, 0.3)" }}
        >
          Perfumes Exclusivos
        </h2>

        <div className="flex space-x-6 text-2xl">
          <a
            href="https://www.instagram.com/listen_kazak?igsh=MTJyM2M2eWtuc29qag%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3b82f6" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3b82f680")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#3b82f6")}
            className="transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/@listen_kazak?si=WWjfE2QBzP4pNmdH"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3b82f6" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3b82f680")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#3b82f6")}
            className="transition-colors duration-300"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      <div
        className="text-center text-sm mt-6"
        style={{ color: "#0a0a1a", fontStyle: "italic" }}
      >
        © {new Date().getFullYear()} Perfumes Exclusivos. Todos os direitos reservados.
      </div>
    </footer>
  );
}
