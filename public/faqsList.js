import Link from "next/link";
import classes from "@/app/components/Library.module.css";

export const faqs = [
  {
    section: "About us",
    questions: [
      {
        question: "Where are you based?",
        answer: (
          <span>
            We are a Japanese limited company, based in Nagoya, Japan, with a
            global outreach.
          </span>
        ),
      },
      {
        question: "When was Perceptia Press founded?",
        answer: (
          <span>
            Our first book was <em>Land of Song and Story</em>, way back in
            2004. It’s still in print.
          </span>
        ),
      },
      {
        question: "Do you have a shop I can visit?",
        answer: (
          <span>
            Our office in Nagoya carries no stock and is not open to the public.
            For ordering, please visit our distributors.
          </span>
        ),
      },
      {
        question: "Do you have a phone number?",
        answer: (
          <span>
            We do not at present have a phone number to call, but we pride
            ourselves on being highly responsive to email. If you don’t receive
            a reply in a few hours, please check your Spam mailbox to make sure
            nothing is lurking there…
          </span>
        ),
      },
      {
        question: "Who are your authors?",
        answer: (
          <span>
            We are very proud of our authors, most of whom are teachers
            themselves. We believe they best understand the classroom and needs
            of students, and our books are extensively tested in the classroom
            environment.
          </span>
        ),
      },
      {
        question: "Have you won any awards?",
        answer: (
          <span>
            We are delighted that two of our books,{" "}
            <em>Escape the Classroom</em> and
            <em> Helping Matters</em> were both honoured as finalists in the
            prestigious British Council Awards for Innovation, the ELTons, in
            2021.
          </span>
        ),
      },
    ],
  },
  {
    section: "Ordering books and inspection copies",
    questions: [
      {
        question: "Where can I buy your books?",
        answer: (
          <span>
            Physical (paper) books are sold by{" "}
            <a
              className={classes.linkStyle}
              href="https://www.englishbooks.jp/catalog/index.php/en/perceptia-press-m-81"
              target="_blank"
            >
              englishbooks.jp
            </a>{" "}
            and{" "}
            <a
              className={classes.linkStyle}
              href="https://www.bebc.co.uk/categories/advancedsearch?title=&publisher=Perceptia"
              target="_blank"
            >
              bebc.co.uk
            </a>
            ; please contact them directly for more information. You can also
            order books globally via{" "}
            <a
              className={classes.linkStyle}
              href="https://www.amazon.co.uk/s?k=perceptia+press&i=stripbooks&ref=nb_sb_noss"
              target="_blank"
            >
              Amazon
            </a>
          </span>
        ),
      },
      {
        question: "How can I obtain an inspection copy?",
        answer: (
          <span>
            Take a look at the online flipbook samples, available in the
            individual book pages, and you can also{" "}
            <Link className={classes.linkStyle} href="/Contact">
              contact us
            </Link>{" "}
            directly for a paper copy.
          </span>
        ),
      },
      {
        question: "How can I return books?",
        answer: (
          <span>Contact the distributor from whom you bought the book.</span>
        ),
      },
      {
        question: "Can I become a Perceptia distributor?",
        answer: (
          <span>
            Very possibly, depending on where you are located. Please get in
            touch!
          </span>
        ),
      },
      {
        question: "Can I license your books for sale?",
        answer: (
          <span>We are happy to discuss arrangements. Get in touch!</span>
        ),
      },
    ],
  },
  {
    section: "About our products",
    questions: [
      {
        question: "What kind of textbooks do you publish?",
        answer: (
          <span>
            Our main area is English language, EFL and ESL, as well as English
            for Specific Purposes. Books are often arranged according to skill
            (speaking, listening, etc.). We also have a growing range of books
            “for the caring professions” including English for nurses,
            therapists, nutritionists, social workers, etc.
          </span>
        ),
      },
      {
        question: "Are your books UK or US English?",
        answer: (
          <span>We carry a range, including UK, US, and global English.</span>
        ),
      },
      {
        question: "What are your best-sellers?",
        answer: (
          <span>
            In our general communication range, <em>Scraps</em> has been one of
            the top sellers among all publishers for many years, and continues
            to be popular, even more so since it went to full colour. Our
            English for nurses titles, especially the <em>Bedside Manner</em>{" "}
            series have also captured the market of nursing textbooks.
          </span>
        ),
      },
      {
        question: "Do you have any books for listening?",
        answer: (
          <span>
            Check out <em>Shizuoka Dreaming</em>, which is built around a
            heartwarming story...
          </span>
        ),
      },
      {
        question: "Do you publish CLIL books?",
        answer: (
          <span>
            Yes! We have a growing catalogue of this popular genre, including
            our classics series about Ancient Greece and Ancient Rome, and the
            academic series for linguists and language specialists, including
            <em> Linguistic Soup</em> and <em>What is Language?</em>
          </span>
        ),
      },
      {
        question: "Do you sell eBooks?",
        answer: (
          <span>
            At present, we only sell paper textbooks, but we can provide online
            flipbook class sets in some cases.{" "}
            <Link className={classes.linkStyle} href="/Contact">
              Contact us
            </Link>{" "}
            for details.
          </span>
        ),
      },
      {
        question: "Why don’t you offer online versions of your books?",
        answer: (
          <span>
            Our books often include interactive tasks, such as writing in
            answers—and in some cases, students cutting up pages to find
            solutions and play games—and these do not work on a screen. Instead,
            take a look at our OLS (Online Learning Support) which offers
            hybrid/blended learning to accompany paper textbooks.
          </span>
        ),
      },
    ],
  },
  {
    section: "For teachers",
    questions: [
      {
        question: "Do you have any teacher training books?",
        answer: (
          <span>
            Yes! Check out <em>Good Teacher Better Teacher</em> by Hayo Reinders
            et al.
          </span>
        ),
      },
      {
        question: "What methodologies do your books follow?",
        answer: (
          <span>
            Each author has his or her own style, and we cover a wide range of
            often communicative-based methodologies.
          </span>
        ),
      },
      {
        question: "Do you publish teacher resource books?",
        answer: (
          <span>
            Take a look at <em>Why Can’t Elephants Jump?</em>, which is full of
            resources for JHS and HS students, and includes lesson plans and
            photocopiable worksheets.
          </span>
        ),
      },
      {
        question: "What is the OLS?",
        answer: (
          <span>
            Our Online Learning Support is a Learning Management System,
            available for an increasing number of titles. Although the textbooks
            can work perfectly in self-standing classroom mode, the online
            support provides a vast quantity of additional practice for learners
            including speaking, listening, reading, writing, vocabulary, and
            grammar, all carefully designed to dovetail with the book in
            question. The OLS is accessed via a one-time password scratchcard,
            available separately, which lets the user select one title. The
            service is free for teachers.
          </span>
        ),
      },
      {
        question:
          "I have a very large / mixed level / unmotivated class. What do you recommend?",
        answer: (
          <span>
            <em>Octopus Activities</em> is designed especially for these
            situations! With its truly learner-centred approach and engaging
            student-led speaking activities, it is highly flexible. Give it a
            try!
          </span>
        ),
      },
      {
        question: "Do you provide teacher’s guides / tests?",
        answer: (
          <span>
            Most of our books have separately available teacher’s guides, and
            these are mostly free. To access them, create a teacher account on
            our homepage and log in to download the latest version of the guide.
            Many titles also include localised language packs, tests, and other
            resources. If you cannot find what you need, please{" "}
            <Link className={classes.linkStyle} href="/Contact">
              contact us
            </Link>
            .
          </span>
        ),
      },
      {
        question: "Where are the audio tracks?",
        answer: (
          <span>
            On the home page, select the title in question, and the audio will
            be available from the pop-up window. They should play in the browser
            window and you can also download them. Please note we update and
            improve audio from time to time, so please check back every once in
            a while. If you can’t find the correct audio for your edition/title,
            please{" "}
            <Link className={classes.linkStyle} href="/Contact">
              contact us
            </Link>
            .
          </span>
        ),
      },
    ],
  },
  {
    section: "Teacher Accounts",
    questions: [
      {
        question: "What are the benefits of creating an account?",
        answer: (
          <span>
            Accounts unlock a host of additional resources, including teacher’s
            guides where available. You can find these on the individual book
            pages—just click the cover of the book in the catalogue.
          </span>
        ),
      },
      {
        question: "How do I sign up?",
        answer: (
          <span>
            Visit the{" "}
            <Link className={classes.linkStyle} href="/Contact">
              contact page
            </Link>{" "}
            and click the “Sign up for an account” option, then complete the
            details and press “send.” We will contact you to confirm your log in
            and password.
          </span>
        ),
      },
      {
        question: "Do I have to pay for the account?",
        answer: <span>No, the account is totally free.</span>,
      },
      {
        question: "I’ve forgotten my password. What should I do?",
        answer: (
          <span>Go to the sign-in page, where you can request a reminder.</span>
        ),
      },
      {
        question: "What information do you store?",
        answer: (
          <span>
            Please check our{" "}
            <Link className={classes.linkStyle} href="/Privacy">
              Privacy and Data Policies
            </Link>{" "}
            link at the bottom of the page.
          </span>
        ),
      },
      {
        question: "What do you do with my information?",
        answer: (
          <span>We never sell or pass on your details to anyone else.</span>
        ),
      },
    ],
  },
  {
    section: "For prospective authors",
    questions: [
      {
        question: "I have a project/draft/manuscript. Will you publish it?",
        answer: (
          <span>
            Get in touch via our{" "}
            <Link className={classes.linkStyle} href={"/Submissions"}>
              submissions
            </Link>{" "}
            page, and we will take a look at your ideas.
          </span>
        ),
      },
      {
        question: "Do you republish books?",
        answer: (
          <span>
            If your book has been dropped by its publisher and you have
            reacquired the copyright, we may be interested in republishing,
            normally with an update.{" "}
            <Link className={classes.linkStyle} href="/Contact">
              Get in touch
            </Link>{" "}
            and we can discuss it.
          </span>
        ),
      },
      {
        question: "Do you publish children’s books?",
        answer: (
          <span>
            At present, we do not have any plans for children’s books, although
            some of our titles are aimed at the Junior High School level.
          </span>
        ),
      },
      {
        question: "Do you publish novels or other types of books?",
        answer: (
          <span>
            Most of our books are intended for classroom use, but we have a few
            titles that include humour, cultural essays, and short stories. We
            are always open to new ideas so if you have something you’d like to
            publish,{" "}
            <Link className={classes.linkStyle} href="/Contact">
              get in touch
            </Link>
            .
          </span>
        ),
      },
      {
        question: "Do you do freelance work?",
        answer: (
          <span>
            Perceptia Press produces books for a number of publishers, some of
            whom publish under their own name. If you need our help with any
            aspects of the process, including editing, layout, proofreading, or
            general consultancy, please{" "}
            <Link className={classes.linkStyle} href="/Contact">
              get in touch
            </Link>
            .
          </span>
        ),
      },
    ],
  },
];
