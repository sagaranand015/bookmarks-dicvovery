## Bookmarks Discovery
#### A one stop solution to actually "consume" all the information you come across on the Internet!

### Abstract Doc
https://docs.google.com/document/d/1EunHz818OwbbD-z9lNhHqv8XBoPBV7T-dZRJCxFiE2U/edit?usp=sharing

### Technical Specs & Roadmap
To achieve the POC implementation of the project, we're starting with the following:
1. Connect a demo app to Twitter using their prescribed OAuth2 authentication workflow
2. Get the bookmarks data for a user that authenticates with our app (support only Twitter for now)
3. Once authenticated, we read and save the bookmarks data for the user. [TODO: Scheduled task to make sure the bookmarks data is up to date at all times (Does Twitter support webhook?)]
4. Once the data has been populated, we mark it ready for AI processing. We pass the chunked bookmarks data to a backend pipeline and the pipeline takes care of storing the insights from this data in a meaningful way. [TODO: Scheduled task to take up all data that is ready for processing and run it through the pipeline]
5. The user facing webapp simply reads the structured data and displays the insights back to the user. 



