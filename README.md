# Reddit alternative client

<hr></hr>

This is an application that was developed
as a test task for Jetbrains internship. This
app fetches posts and comments from reddit api,
then displays them.

<hr></hr>

### Features

* OAuth Authentication: Uses Reddit's OAuth2 to authenticate and fetch data.
* Axios for HTTP Requests: Handles API requests and token refresh logic.
* React: Utilizes React for building the user interface.
* TypeScript: Ensures type safety and better development experience.

### Instalation

1. Clone the repository:

```shell
git clone https://github.com/ShadowCatP/reddit-alternative-client
cd reddit-app
```

2. Install dependencies:

```shell
npm install
```

3. Create a `.env` file in the root directory and add your Reddit API credentials:

```.env
VITE_CLIENT_ID=your_client_id
VITE_CLIENT_SECRET=your_client_secret
```

### Usage

* Development:

```shell
npm run dev
```

* Preview:

```shell
npm run start
```

### Development and challenges

Although I am well-versed in developing applications that perform API calls, creating a system that makes such a high
volume of requests was a first for me and presented several challenges.

The initial obstacle I encountered was Reddit's API rate limits, which restrict the number of unauthenticated requests.
To address this, I implemented an authentication instance in `auth.ts` using Reddit's OAuth2.

Next challenge was an error 429 (Too many requests) that I've encountered multiple times, so to fix it I've done 2
things:

1. **Debouncing Requests**: I developed a `debounce.ts` utility function to control the rate at which requests are made,
   ensuring that they don't exceed the allowed limit.
2. **Rate Limit Handlers**: I added rate limit handlers in my `api.ts` that automatically retry requests with a delay
   whenever a 429 error is encountered.

<hr></hr>

### UI/UX Choices

This App is heavily and I mean HEAVILY inspired by Reddit's own design, because I like how Reddit looks.

1. To provide user with clutter-free environment I've chosen to develop a minimalistic layout that emphasizes content
   over distractions.
2. To give user a seamless navigation between subreddit main page and individual posts, all current subreddit posts are
   stored inside local storage.
3. I implemented an error page that informs users when something goes wrong, with options to return to the previous page
   or go back to the home page.
4. I added a home page button to the search bar, allowing users to easily return to the home page from any page they are
   on.

<hr></hr>

### Future improvements

There are quite a few things to improve in this project:

1. When user is in subreddit display bar changes its text to something like "Search r/subreddit" this is done not only
   to inform the user in which subreddit they are. I wanted to implement the functionality to run search of posts in a
   subreddit, but didn't have time to do it.
2. Load more comments: currently if user tries to view comments of a somewhat large post e.g.: 2k comments this app will
   not display all, because reddit API does not actually return all of them, instead its give a "more" token to load
   more comments.
3. Loading media for a post: some posts on Reddit has preview images that user can see if there is a link present, but
   API does not provide pictures for those previews in response, so I could for example make a functionality to go in
   this link and find a preview image to display it instead of link, how Reddit likely does it.
4. Adding sidebar: to increase user experience even more there should be a sidebar that will be used to display relevant
   data as navigation and recently visited subreddits.