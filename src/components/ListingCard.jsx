import React from 'react';

const ListingCard = ({ username, age, emailStatus, negotiable, profileLink }) => {
  return (
    <div className="bg-zinc-800 text-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto mb-6 border border-zinc-700 hover:scale-[1.02] transition-all">
      <h2 className="text-xl font-semibold mb-2">{username}</h2>

      <div className="space-y-1 text-sm text-gray-300">
        <p><span className="font-semibold text-gray-200">Age:</span> {age}</p>
        <p><span className="font-semibold text-gray-200">Email Status:</span> {emailStatus}</p>
        <p><span className="font-semibold text-gray-200">Negotiable:</span> {negotiable ? 'Yes' : 'No'}</p>
        <p>
          <span className="font-semibold text-gray-200">Profile:</span>{' '}
          <a
            href={profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View Roblox Profile
          </a>
        </p>
      </div>

      <button
        className="mt-4 w-full py-2 px-4 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition"
        onClick={() => {
          window.Swal.fire({
            title: 'Contact Seller',
            text: 'Choose where to contact:',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Discord',
            cancelButtonText: 'Facebook'
          }).then((result) => {
            if (result.isConfirmed) {
              window.open('https://discord.gg/AngyvYKe', '_blank');
            } else if (result.dismiss === window.Swal.DismissReason.cancel) {
              window.open('https://www.facebook.com/mix.nthe.clubb', '_blank');
            }
          });
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ListingCard;
