import React from "react";

const accounts = [
  {
    username: "CoolRobloxian",
    age: "13+",
    robloxLink: "https://www.roblox.com/users/123456789/profile",
    emailVerified: true,
    description: "OG name, 2015 account, clean history.",
    price: 120,
    robux: 5000,
  },
  {
    username: "BuilderGuy",
    age: "13+",
    robloxLink: "https://www.roblox.com/users/987654321/profile",
    emailVerified: false,
    description: "Rare username, no bans, 2013 account.",
    price: 180,
    robux: 8000,
  },
];

const handleBuyClick = () => {
  window.Swal.fire({
    title: "Contact Seller",
    html: `
      <p>Choose a platform to contact the seller:</p>
      <div style="margin-top: 1rem;">
        <a href="https://discord.gg/AngyvYKe" target="_blank" style="color: #5865F2; font-weight: bold; text-decoration: none; margin-right: 20px;">
          Discord
        </a>
        <a href="https://www.facebook.com/mix.nthe.clubb" target="_blank" style="color: #1877F2; font-weight: bold; text-decoration: none;">
          Facebook
        </a>
      </div>
    `,
    background: "#1e293b",
    color: "#fff",
    confirmButtonColor: "#6366f1",
    confirmButtonText: "Close",
  });
};

export default function RolimonsStyleListing() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 p-10">
      <h1 className="text-white text-4xl font-bold mb-12 text-center tracking-wide">
        Roblox Accounts for Sale
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {accounts.map((acc, i) => (
          <div
            key={i}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-white font-semibold text-xl truncate">{acc.username}</h2>
              <span className="bg-yellow-400 text-gray-900 font-bold px-4 py-1 rounded-full text-sm">
                ${acc.price}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-3 truncate" title={acc.description}>
              {acc.description}
            </p>

            <div className="flex gap-4 text-sm text-gray-300 mb-4">
              <span>
                Robux: <span className="text-white">{acc.robux.toLocaleString()}</span>
              </span>
              <span>
                Age: <span className="text-white">{acc.age}</span>
              </span>
              <span>
                Email Verified:{" "}
                <span className={`font-semibold ${acc.emailVerified ? "text-green-400" : "text-red-400"}`}>
                  {acc.emailVerified ? "Yes" : "No"}
                </span>
              </span>
            </div>

            <a
              href={acc.robloxLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-600 font-medium mb-6"
            >
              View Roblox Profile
            </a>

            <button
              onClick={handleBuyClick}
              className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
