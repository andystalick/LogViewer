# LogViewer example


## Goals
- Provide an UI for viewing the contents of a log file downloaded from an URL. They would like to be able to quickly scroll through the log entries, as well as be able to expand an entry to see the full log event. Due to the fact that log files can be huge, they would like to see the log events as soon as they are transmitted to the browser over the wire, without waiting for the entire file to download.
- Unit test at least to demonstrage the concept
- Render the list of log entries as a table with two columns. 
-- The first column should display the time (the value of the _time property), formatted as ISO 8601.
-- The second column should present the entire event formatted as single line JSON. Each log
entry should be rendered as a separate row.
- It should be possible to expand/collapse rows. When expanded, the row should display the
entire event formatted as multiline JSON, each property in a new line.
- The component should pull data from the given URL and update the view while individual log
entries are being downloaded from the server. The data is provided in the NDJSON format (new line delimited JSON). The UX should be optimized for time to first byte, i.e. the component should render the events as soon as they are downloaded from the server, without waiting for the entire file to download.
- Implement a simple timeline component, similar to the one presented on the mockup below, that will show the distribution of log events over time. For this portion of the exercise, feel free to use whatever charting library you want (or even better, no charting library at all).

## Delivery
- Github public repo
- CodeSandbox instance for testing

## Dev Log
- 082620241239 Starting out with a clean repo. I want to use Typescript and a nice DevX toolset so I am using Vite and their boilerplate.