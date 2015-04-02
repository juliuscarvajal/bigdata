# bigdata

Weather Balloon Data Processor (tested on a Macbook Air)

Prerequisites:<br>
1. Install nodejs<br>
2. Install mongodb<br>

Steps:<br>
1. Github clone or get zip and unzip to folder <br>
2. cd to folder <br>
3. npm install <br>
4. node read-data.js <--- This will watch the data folder for new files then write to mongodb. Then the files gets deleted. <br>
5. node --harmony generate-data.js 100 <--- This will generate the dummy data into files. The arguments determine the number of dummy lines. <br>

<br>

This is work in progress. This big data stuff is really cool it lets me think big in code. Traditional loops won't cut it as it will exceed the stack limit. Recursion + Nodejs' setImmediate to the rescue. Having fun with these new stuff. Due to storage limitations on my Macbook Air, I can only produce 20 million lines of data. There should be no limit on a more capable machine.

[UPDATE]
query-db.js contains the required queries and the output. Unfortunately, I was booked for a contract work so I will revisit this once I am free. Learned so much about handling big data with Nodejs and MongoDB.

I do hope to get the Ambiata job as I am really passionate about big data and I feel I can contribute a lot given my full concentration and time.

