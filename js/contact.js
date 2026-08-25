const container = document.getElementById("contact-container");




container.innerHTML = `

<section style="padding-top:64px;">

    <div class="container">

        <div class="section-head">

            <h1>Get in Touch</h1>

            <p>
                Have a question, professional opportunity, or collaboration
                idea? Feel free to send me a message.
            </p>

        </div>


        <div class="grid cols-2">


            <!-- CONTACT INFORMATION -->

            <div>

                <div class="card">

                    <span class="path">Contact</span>

                    <h3>Let's Connect</h3>

                    <p>
                        I'm currently interested in internship opportunities,
                        technology projects, business analysis, data analytics,
                        and professional networking.
                    </p>

                </div>


                <div class="card">

                    <span class="path">Email</span>

                    <h3>Email</h3>

                    <p>
                        <a href="mailto:YOUR_EMAIL@gmail.com">
                            YOUR_EMAIL@gmail.com
                        </a>
                    </p>

                </div>


                <div class="card">

                    <span class="path">LinkedIn</span>

                    <h3>LinkedIn</h3>

                    <p>
                        <a
                            href="YOUR_LINKEDIN_URL"
                            target="_blank"
                            rel="noopener">
                            Connect with me on LinkedIn ↗
                        </a>
                    </p>

                </div>

            </div>


            <!-- CONTACT FORM -->

            <div class="card">

                <span class="path">Message</span>

                <h3>Send a Message</h3>


                <form id="contactForm">


                    <div style="margin-bottom:20px;">

                        <label for="name">
                            Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            maxlength="100"
                            style="
                                width:100%;
                                padding:12px;
                                margin-top:8px;
                                box-sizing:border-box;
                            "
                        >

                    </div>


                    <div style="margin-bottom:20px;">

                        <label for="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            required
                            maxlength="150"
                            style="
                                width:100%;
                                padding:12px;
                                margin-top:8px;
                                box-sizing:border-box;
                            "
                        >

                    </div>


                    <div style="margin-bottom:20px;">

                        <label for="subject">
                            Subject
                        </label>

                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            required
                            maxlength="200"
                            style="
                                width:100%;
                                padding:12px;
                                margin-top:8px;
                                box-sizing:border-box;
                            "
                        >

                    </div>


                    <div style="margin-bottom:20px;">

                        <label for="message">
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            placeholder="Write your message..."
                            rows="7"
                            required
                            maxlength="5000"
                            style="
                                width:100%;
                                padding:12px;
                                margin-top:8px;
                                box-sizing:border-box;
                                resize:vertical;
                            "
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        class="btn"
                        id="sendButton">

                        Send Message

                    </button>


                    <p
                        id="formMessage"
                        style="
                            margin-top:15px;
                            font-weight:500;
                        ">
                    </p>


                </form>

            </div>

        </div>

    </div>

</section>

`;


/* =========================
   FORM SUBMISSION
========================= */

const form = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const sendButton = document.getElementById("sendButton");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    /* Get form values */

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    /* Basic validation */

    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;
    }


    /* Email validation */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        return;
    }


    /* Disable button */

    sendButton.disabled = true;

    sendButton.textContent = "Sending...";

    formMessage.textContent = "";


    try {


        /*
         IMPORTANT:

         For local testing:
         http://localhost:5000/api/contact

         After deploying your backend:
         https://YOUR-BACKEND-DOMAIN/api/contact
        */

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    email: email,
                    subject: subject,
                    message: message

                })

            }
        );


        const result =
            await response.json();


        if (response.ok) {


            formMessage.textContent =
                "✓ Your message has been sent successfully!";


            form.reset();


        } else {


            formMessage.textContent =
                result.message ||
                "Unable to send your message.";


        }


    } catch (error) {


        console.error(
            "Contact form error:",
            error
        );


        formMessage.textContent =
            "Unable to connect to the server. Please try again later.";


    }


    /* Enable button again */

    sendButton.disabled = false;

    sendButton.textContent =
        "Send Message";

});