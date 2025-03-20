# ElifTech

1.Uploaded source code to GitHub:
https://github.com/SanekOstapiuk/ElifTech

2. The front-end developed in TypeScript
3. The back-end built with Express
4. Database using MongoDB

Base level

1.Crated a catalog page with:
- Questionnaire name
- Description
- Amount of questions
- Amount of completions
- Actions: edit/run/delete
- Button to create new Quiz(redirect to builder page)

2. Created a builder page with the following input types
- Text - free-form user input
- Single choice - user can select only one of the possible answers (radio buttons)
- Multiple choices - user can select several answers (checkbox buttons)
- After submitted data is stored in database

3. Created an edit page with same input types, allowing users to modify:
- Quiz name
- Quiz description
- Quiz questions
- Quiz choices

After submitted data is updated in database

4. Created questionnaire page where user can answer all questions
- added a timer
After submitted:
- data is saved in database, including: question, answer, quizId, timer
- update counter in increased by 1
