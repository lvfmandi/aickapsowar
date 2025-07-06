/* 
  Simple util function to render the copyrights of the page
*/

export const Copy = () => {
  const year = new Date().getFullYear();

  return (
    <small>
      &copy; {year} Potestas Technologies &sdot; All rights reserved
    </small>
  );
};
