class AsyncGame {
  constructor() {
    this.API_BASE = "https://u-workshops.herokuapp.com";
    this.userId;
  }

  /* 
        Note: most of these methods will use the `fetch` API
        It's ok if you don't fully understand it yet! You can think of it as a 'blackbox' for now
    */

  async createUser(name) {
    // POST request to the /new_user endpoint
    try {
      const response = await fetch(`${this.API_BASE}/new_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const result = await response.json();
      console.log(result);
      this.userId = result.userId;
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  }

  async addToQABank(question, answer) {
    // POST request to /new_qa
    // {ownerId: YOUR_USER_ID, question: "STRING QUESTION", answer: "STRING OR INT ANSWER"}
    try {
      const response = await fetch(`${this.API_BASE}/new_qa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: this.userId,
          question: question,
          answer: answer,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  }

  async getAllQuestions() {
    // GET request to /all_questions
    // Note! More questions will be added as other students progress in this workshop.
    // Ask around to see who's added new questions!
    try {
      const response = await fetch(`${this.API_BASE}/all_questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  }

  async answerQuestion(qaId, answer) {
    // POST request to /answer_question
    // Note! In the response of this request you'll see whether your answer was correct or not.
    // If you answered incorrectly, try again or bring it up with the user who posted the question!
    // game.answerQuestion({qaId: ID_FROM_SERVER, answer: YOUR_ANSWER, userId: YOUR_USER_ID})
    try {
      const response = await fetch(`${this.API_BASE}/answer_question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: this.userId,
          qaId: qaId,
          answer: answer,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  }

  async getAnswerSubmissions() {
    // GET request to /answer_submissions
    try {
      const response = await fetch(`${this.API_BASE}/answer_submission`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error.message);
    }
  }

  async getUsers() {
    // GET request to /the_users
    try {
      const response = await fetch(`${this.API_BASE}/the_users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  }

  async calculateUserScores() {
    // +1 points for questions you've answered correctly
    // -1 points for questions you've answered incorrectly
    // This is the most "complicated" method - but you've got this ;)
    // Guidelines for this part (ignore if you want an extra challenge!)
    /*
            - Get the users
            - Get the submissions
            - Create an `scores` object
            - Loop through each user ID
                - Extract the username
                - Filter the correct submissions with matching user ID
                - Filter the incorrect submissions with matching user ID
                - Add a new entry to `scores` with the user's name and their score (correct.length - incorrect.length)

            Example of `score` at the end of this: 
            {
                Kayla: 12,
                Darwin: -1
            }
        */
    let users = this.getUsers();
    let submissions = this.getAnswerSubmissions();
    let scores = {};

    users.forEach((index, user) => {
      console.log(index, user);
      let username = user.name;
    });
  }
}

const game = new AsyncGame();
// Remember the server is unexpected, it might return an error!

// Example of running the game:

// game.getAllQuestions()
// game.answerQuestion({qaId: ID_FROM_SERVER, answer: YOUR_ANSWER, userId: YOUR_USER_ID})

// game.getUsers() // <-- how can you output the results from here *without* console.log in the method?
// game.getAnswerSubmissions()
// game.calculateUserScores()
