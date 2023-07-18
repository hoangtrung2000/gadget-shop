import React from "react";
import icons from "../utils/icons";

const styles = {
  input: `w-full rounded-l-full bg-[#F04646] p-4 pr-0 text-gray-100 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-100 placeholder:opacity-50`,
  flexCenter: `flex items-center justify-center`,
  iconMail: `h-[56px] w-[56px] rounded-r-full bg-[#F04646] text-white`,
  titleFooter: `mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium`,
  flex1Col: `flex flex-col flex-1`,
};

const { GrMail } = icons;

const Footer: React.FC = () => {
  return (
    <div className="w-full">
      <div className={`h-[103px] w-full bg-main ${styles.flexCenter}`}>
        <div className="flex w-main items-center justify-between">
          <div className={styles.flex1Col}>
            <span className="text-[20px] text-gray-100">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-gray-300">
              subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex flex-1 items-center">
            <input
              type="text"
              placeholder="Email address"
              className={styles.input}
            />
            <div className={`${styles.iconMail} ${styles.flexCenter}`}>
              <GrMail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.flexCenter} h-[407px] bg-[#191919] text-[13px] text-white`}
      >
        <div className="flex w-main">
          <div className="flex flex-2 flex-col">
            <h3 className={styles.titleFooter}>ABOUT US</h3>
            <span>
              <span>Address:</span>
              <span className="opacity-70">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </span>
            <span>
              <span>Phone:</span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail:</span>
              <span className="opacity-70">admin_system@gmail.com</span>
            </span>
          </div>
          <div className={styles.flex1Col}>
            <h3 className={styles.titleFooter}>INFORMATION</h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>store Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className={styles.flex1Col}>
            <h3 className={styles.titleFooter}>WHO WE ARE</h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className={styles.flex1Col}>
            <h3 className={styles.titleFooter}>#DIGITALWORLDSTORE</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
