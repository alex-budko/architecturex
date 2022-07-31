import axios from "axios";

export async function contact_email(name, email, message) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      message
    });
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/message/`,
        body,
        config
      );
      console.log("Message Sent")
    } catch (err) {
      console.log(err)
    }
  }