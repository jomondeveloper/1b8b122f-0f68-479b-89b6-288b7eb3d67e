# AssessmentPro

AssessmentPro is a CLI application designed to generate different types of reports based on student assessment data. It allows the generation of Diagnostic, Progress, and Feedback reports for students based on their assessment responses.

## Features

- **Diagnostic Report**: Provides a summary of a student's performance in the latest assessment, highlighting areas of strength and weakness.
- **Progress Report**: Shows a student's progress over time across different assessments.
- **Feedback Report**: Offers detailed feedback on questions answered incorrectly in the most recent assessment.

## Getting Started

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed for TypeScript execution.

### Installation

Clone the repository to your local machine:

```bash
git clone git@github.com:jomondeveloper/1b8b122f-0f68-479b-89b6-288b7eb3d67e.git

cd 1b8b122f-0f68-479b-89b6-288b7eb3d67e
```

Install the necessary dependencies:
```bash
npm install
```
### Running the Application

To run the application, execute:
```bash
npm run app
```
Follow the prompts to enter the Student ID and select the type of report to generate.

### Sample Usage

Please enter the following
Student ID: student1

Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): 1

###Sample Output

Diagnostic Report Output

Tony Stark recently completed Numeracy assessment on 16th December 2021 10:46 AM
He got 15 questions right out of 16. Details by strand given below:
Numeracy and Algebra: 5 out of 5 correct
Measurement and Geometry: 7 out of 7 correct
Statistics and Probability: 3 out of 4 correct

Progress Report Output

Tony Stark has completed Numeracy assessment 3 times in total. Date and raw score given below:
Date: 14th December 2019, Raw Score: 6 out of 16
Date: 14th December 2020, Raw Score: 10 out of 16
Date: 14th December 2021, Raw Score: 15 out of 16

Feedback Report Output

Tony Stark recently completed Numeracy assessment on 16th December 2021 10:46 AM
He got 15 questions right out of 16. Feedback for wrong answers given below
Question: What is the 'median' of the following group of numbers 5, 21, 7, 18, 9?
Your answer: A with value 7
Right answer: B with value 9
Hint: You must first arrange the numbers in ascending order. The median is the middle term, which in this case is 9

### Running Tests

To run automated tests, use the following command:
```bash
npm run test
```
### Continuous Integration
This project uses GitHub Actions for continuous integration, automatically running tests for each push or pull request.

### Development and Contributions

Feel free to fork this repository and submit pull requests. To contribute:

### Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a pull request.

### License

This project is licensed under the GPL-3.0 license.


