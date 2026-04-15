import { User, Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import BlackButton from "../components/common/BlackButton";
import WhiteButton from "../components/common/WhiteButton";
import ImageWithLoader from "../components/common/ImageWithLoader";
import { updateUser, updatePassword } from "../services/auth.service";
import { showError, showSuccess } from "../utils/toast";

const Profile = () => {
  useEffect(() => {
    localStorage.removeItem("appointmentId");
  }, []);

  const [activeImg, setActiveImg] = useState("");

  const profileImgs = [
    "/profile/female1.png",
    "/profile/female2.png",
    "/profile/female3.png",
    "/profile/male1.png",
    "/profile/male2.png",
    "/profile/male3.png",
  ];

  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    img_url: "",
  });

 const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
  rePassword: "",
 })

  const getUpdatedData = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null,
      ),
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = getUpdatedData(formData);
    try {
      const res = await updateUser(data);
      if(res){
        setUser({...user,...data})
      }
      console.log(res);
      showSuccess("details Updated");
      
    } catch (error) {
      showError("Something went wrong while updating");
      
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({...passwordForm,[e.target.name]: e.target.value});
  }

  const handlePasswordSubmit = async(e) => {
    e.preventDefault();
    if(passwordForm.newPassword !== passwordForm.rePassword){
      showError("Passwords do not match");
      return;
    }

    try {
      const { rePassword, ...dataToSend} = passwordForm;
      const res = await updatePassword(dataToSend);
      console.log(res);
      showSuccess("Password updated");
      
    } catch (err) {
      console.log(err);
      
    }

  }

  const { user, setUser } = useAuth();
  return (
    <div className="md:px-72 px-5 bg-gray-50">
      <header className="p-5">
        <h1 className="font-bold text-3xl text-teal-700">Profile</h1>
        <span>Manage your account information</span>
      </header>

      {/* Main card */}

      <div className="flex border group transition-all duration-150 hover:border-sky-600 border-gray-300 rounded-xl px-8 py-10 items-center bg-white shadow-md hover:bg-linear-to-br from-sky-50 via-white to-white ">
        <div className="flex flex-col items-center">
          <ImageWithLoader
            src={user.img_url}
            alt="user image"
            className=" transition-all duration-150 overflow-hidden rounded-full w-36 h-36 border-4 group-hover:border-sky-700 border-gray-300"
          />
          <span className="transition-all duration-150 mt-3 font-medium group-hover:text-teal-700">
            {user.role} Account
          </span>
        </div>
        <div className="flex flex-col ml-5 gap-5">
          <span className="flex gap-2 group-hover:text-sky-700 transition-all duration-150">
            <User className="group-hover:stroke-teal-700 transition-all duration-150" />
            {user.name}
          </span>
          <span className="flex gap-2 group-hover:text-sky-700 transition-all duration-150">
            <Mail className="group-hover:stroke-teal-700 transition-all duration-150" />
            {user.email}
          </span>
          <span className="flex gap-2 group-hover:text-sky-700 transition-all duration-150">
            <Phone className="group-hover:stroke-teal-700 transition-all duration-150" />
            {user.contact}
          </span>
        </div>
      </div>

      {/* Account Information */}

      <form
        onSubmit={handleSubmit}
        className="flex group transition-all duration-150 hover:border-sky-600 flex-col border border-gray-300 rounded-xl mt-5 p-5 shadow-md hover:bg-linear-to-br from-sky-50 via-white to-white"
      >
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-lg group-hover:text-teal-700">
              Edit Account Information
            </h2>
            <span className="text-sm text-gray-500">
              Update only the fields you want to change. Leave the rest blank.
            </span>
          </div>
          <button
            type="submit"
            className="bg-sky-700 transition-all duration-150 cursor-pointer px-3 py-1 rounded-lg text-white border border-sky-700 hover:bg-white hover:text-sky-700 h-fit"
          >
            Save Changes
          </button>
        </div>

        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
          className="border border-gray-200 hover:border-sky-600 rounded-lg mt-3 py-1 px-3"
        />
        <input
          type="tel"
          placeholder="contact number"
          name="contact"
          onChange={handleChange}
          className="border border-gray-200 hover:border-sky-600 rounded-lg mt-3 py-1 px-3"
        />

        <div className="font-medium group-hover:text-teal-700 my-3">Update Profile Image</div>
        <input
          type="text"
          placeholder="Enter image URL"
          name="img_url"
          onChange={handleChange}
          className="border border-gray-200 hover:border-sky-600 rounded-lg py-1 px-3"
        />
        <div className="my-3 text-sm text-gray-500">OR choose from the options below</div>

        <div className="flex flex-wrap gap-3 p-3">
          {profileImgs.map((img) => (
            <button
              type="button"
              key={img}
              onClick={() => {
                if(activeImg){
                  setActiveImg("")
                  setFormData({...formData, img_url: ""});
                }
                else{
                  setActiveImg(img)
                setFormData({...formData, img_url: img})
                }
              }}
              className={`border rounded-full  overflow-hidden ${activeImg == img ? "border-black hover:border-black " : "border-transparent hover:border-sky-600 cursor-pointer"}`}
            >
              <ImageWithLoader src={img} alt="avatar" className="w-20 h-20" />
            </button>
          ))}
        </div>
      </form>

      {/* Security */}

      <form onSubmit={handlePasswordSubmit} className="flex transition-all group duration-150 hover:border-sky-600 flex-col border border-gray-300 rounded-xl mt-5 p-5 shadow-md hover:bg-linear-to-br from-sky-50 via-white to-white gap-5">
        <h2 className="font-bold group-hover:text-teal-700">Security</h2>
        <input
          type="password"
          name="currentPassword"
          onChange={handlePasswordChange}
          placeholder="old password"
          className="border border-gray-200 rounded-lg py-1 px-3 hover:border-sky-600"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="new password"
          onChange={handlePasswordChange}
          className="border border-gray-200 rounded-lg py-1 px-3 hover:border-sky-600"
        />
        <input
          type="password"
          name="rePassword"
          placeholder="re-type new password"
          onChange={handlePasswordChange}
          className="border border-gray-200 rounded-lg py-1 px-3 hover:border-sky-600"
        />
        <WhiteButton
          title="Change Password"
          textColor="black"
          onClick={() => showError("cannot edit details for now")}
        />
      </form>

      {/* Delete zone */}

      <div className="flex transition-all duration-150 hover:border-sky-600 flex-col border border-red-600 rounded-xl mt-5 p-5 shadow-md hover:bg-linear-to-br from-sky-50 via-white to-white">
        <h2 className="text-xl font-bold text-red-600 mb-5">Danger Zone</h2>

        <button
        onClick={()=>showError("Can't delete account for now!")}
        className="border border-gray-300 py-1 px-3 rounded-lg text-red-700 hover:border-red-700 hover:bg-red-50 cursor-pointer">Delete</button>
      </div>
    </div>
  );
};

export default Profile;
