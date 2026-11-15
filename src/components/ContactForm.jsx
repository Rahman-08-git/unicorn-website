/*
  Shown only when FORM_ENDPOINT in src/data/site.js holds a real form service URL. The design
  system's form script (public/assets/kit/system.js) checks the fields on submit, posts to
  data-endpoint and shows the confirmation only after the service has answered: there is no
  pretend success.
*/
export default function ContactForm({ endpoint }) {
  return (
    <form className="form contact-form" data-endpoint={endpoint} action={endpoint} method="post" noValidate>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" type="text" autoComplete="name" required aria-describedby="f-name-err" />
        <p className="field__error" id="f-name-err" hidden>
          Write the name we should reply to.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-describedby="f-email-err" />
        <p className="field__error" id="f-email-err" hidden>
          Write an email address with an @, like name@example.com.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea id="f-message" name="message" rows="5" required aria-describedby="f-message-err" />
        <p className="field__error" id="f-message-err" hidden>
          Write a few words about who the learners are and what you have in mind.
        </p>
      </div>
      <div className="btn-row">
        <button className="btn btn--primary" type="submit">
          Send message
        </button>
      </div>
      <p className="form__status" role="status" data-form-status data-sent="Your message is sent. We will reply by email." />
    </form>
  )
}
