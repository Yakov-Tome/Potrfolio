import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Form = () => {
  const [isSending, setIsSending] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message Sent Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      document.getElementById("myForm").reset();
      setIsSending(false);
    } catch (error) {
      toast.error("Oops! Message Not Sent!");
    }
  };

  return (
    <form
      ref={form}
      id="myForm"
      onSubmit={sendEmail}
      className="flex flex-col sm:flex-row sm:flex-wrap gap-4 bg-black/30 p-8 rounded h-full"
      aria-label="Contact form"
    >
      {/* Name */}
      <div className="flex-1">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-info w-full"
          required
          aria-label="Your Name"
        />
      </div>

      {/* Email */}
      <div className="flex-1">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-info w-full"
          required
          aria-label="Your Email"
        />
      </div>

      {/* Subject */}
      <div className="w-full">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="input input-info w-full"
          required
          aria-label="Subject"
        />
      </div>

      {/* Message */}
      <div className="w-full">
        <textarea
          name="message"
          placeholder="Message"
          className="textarea textarea-info w-full"
          required
          aria-label="Your Message"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-info w-full"
        aria-label="Send Message"
        disabled={isSending}
      >
        {isSending ? (
          <>
            <span className="loading loading-ring loading-lg"></span>
            <span>Sending...</span>
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

export default Form;
