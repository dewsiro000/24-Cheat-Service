import Avatar from "@mui/material/Avatar";
import type { ProfileMenuProps } from "../../types/userTypes";

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  user,
  handleLogout,
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={toggleMenu}
        className="text-white"
        aria-label="userprofile"
      >
        <Avatar src="/broken-image.jpg" sx={{ width: 40, height: 40 }} />
      </button>

      <h3 className="text-white sm:text-md">{user?.username || "Norawit"}</h3>
      {isMenuOpen && (
        <div className="flex flex-col mt-24 w-32 md:w-40 bg-white text-black shadow-lg rounded-md absolute left-0">
          <div className="px-4 py-1">
            <button
              onClick={handleLogout}
              className="block w-full text-sm py-2 px-4 text-left hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
