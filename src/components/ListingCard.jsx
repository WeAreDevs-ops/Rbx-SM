// ListingCard.jsx
import React from 'react';

const ListingCard = ({ username, robloxLink, price }) => {

  function handleBuyClick() {
    window.Swal.fire({
      title: 'Contact Seller',
      text: 'Choose a platform to contact me',
      icon: 'info',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Discord',
      denyButtonText: 'Facebook',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if(result.isConfirmed) {
        window.open('https://discord.gg/AngyvYKe', '_blank');
      } else if (result.isDenied) {
        window.open('https://www.facebook.com/mix.nthe.clubb', '_blank');
      }
    });
  }

  return (
    <div className="card max-w-md mx-auto">
      <h3 className="text-gold text-xl font-semibold mb-2">{username}</h3>
      <p className="text-textMuted mb-3">
        Roblox Profile: <a href={robloxLink} target="_blank" rel="noopener noreferrer" className="hover:underline">{robloxLink}</a>
      </p>
      <p className="text-textLight font-semibold mb-4">Price: <span className="text-gold">${price}</span></p>
      <button onClick={handleBuyClick}>Buy</button>
    </div>
  );
};

export default ListingCard;
